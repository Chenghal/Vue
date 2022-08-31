<!-- Home -->
<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <span>后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <!-- 侧边栏区域 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" :collapse="isCollapse"
                    :collapse-transition="false" router :default-active="activePath">
                    <!-- 一级菜单区域 -->
                    <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
                        <template slot="title">
                            <i :class="iconsObj[item.id]"></i>
                            <span>{{ item.authName }}</span>
                        </template>
                        <el-menu-item :index="'/' + subitem.path" v-for="subitem in item.children" :key="subitem.id"
                            @click="saveNavState('/' + subitem.path)">
                            <!-- 二级菜单区域 -->
                            <i class="el-icon-menu"></i>
                            <span>{{ subitem.authName }}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 主要区域 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { menusApi } from '@/api/menusApi.js'
export default {
    created() {
        this.getMenuList()
    },
    methods: {
        logout() {
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        async getMenuList() {
            const { data: res } = await menusApi('/menus')
            // const { data: res } = await this.$http.get('menus')
            if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
            this.menulist = res.data
            console.log(res)
        },
        toggleCollapse() {
            this.isCollapse = !this.isCollapse
        },
        saveNavState(activePath) {
            window.sessionStorage.setItem('activePath', activePath)
            this.activePath = activePath
        }

    },
    data() {
        return {
            menulist: [],
            iconsObj: {
                125: 'iconfont icon-user',
                103: 'iconfont icon-tijikongjian',
                101: 'iconfont icon-shangpin',
                102: 'iconfont icon-danju',
                145: 'iconfont icon-baobiao'
            },
            isCollapse: false,
            activePath: ''
        }
    }
}
</script>

<style lang="less" scoped>
.home-container {
    height: 100%;
}

.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px
}

.el-aside {
    background-color: #333744;
    transition: 0.5s;

    .el-menu {
        border-right: 0;
    }
}

.iconfont {
    margin-right: 10px;
}

.toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>
