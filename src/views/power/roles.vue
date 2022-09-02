<!--  -->
<template>
    <div>
        <!-- 面包屑区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!-- 添加角色按钮区域 -->
            <el-row>
                <el-col>
                    <el-button type="primary" @click="addRolesialogVisible = true">添加角色</el-button>
                </el-col>
            </el-row>
            <!-- 角色列表区域 -->
            <el-table :data="roleList" border stripe>
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
                            v-for="(item1, i1) in scope.row.children" :key="item1.id">
                            <!-- 一级权限 -->
                            <el-col :span="5">
                                <el-tag closable @close="removeRightById(scope.row, item1.id)">{{ item1.authName }}
                                </el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!-- 二、三级权限 -->
                            <el-col :span="19">
                                <el-row :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                                    v-for="(item2, i2) in item1.children" :key="item2.id">
                                    <el-col :span="6">
                                        <el-tag type="success" closable @close="removeRightById(scope.row, item2.id)">{{
                                                item2.authName
                                        }}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-tag closable type="warning" v-for="(item3, i3) in item2.children"
                                            :key="item3.id" @close="removeRightById(scope.row, item3.id)">{{
                                                    item3.authName
                                            }}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete">删除</el-button>
                        <el-button type="warning" icon="el-icon-edit" @click="showSetRightDialog(scope.row)">分配权限
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 添加角色对话框 -->
        <el-dialog title="添加角色" :visible.sync="addRolesialogVisible" width="50%">
            <el-form ref="roleRef" :model="rolesInfo" label-width="70px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="rolesInfo.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="rolesInfo.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addRolesialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRolesialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 分配权限对话框 -->
        <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%" @close="setRightDialogClosed">
            <el-tree show-checkbox node-key="id" default-expand-all :data="rightLis" :props="treeProps"
                :default-checked-keys="defkeys" ref="treeref"></el-tree>

            <span slot="footer" class="dialog-footer">
                <el-button @click="setRightDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="allotRights">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            roleList: [],
            setRightDialogVisible: false,
            rightLis: [],
            // 树形控件的属性绑定对象
            treeProps: {
                children: 'children',
                label: 'authName'
            },
            defkeys: [],
            roleId: '',
            addRolesialogVisible: false,
            rolesInfo: {
                roleName: '',
                roleDesc: ''
            }
        }
    },
    created() {
        this.getRolesList()
    },
    methods: {
        // 请求角色列表数据
        async getRolesList() {
            const { data: res } = await this.$http.get('roles')
            if (res.meta.status !== 200)
                return this.$message.error('获取角色列表数据失败')
            this.roleList = res.data
            console.log(this.roleList)
        },
        // 删除权限
        async removeRightById(role, rightid) {
            const confirmResult = await this.$confirm('此操作将删除该权限, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confirmResult !== 'confirm') {
                return this.$message.info('取消了删除操作')
            }
            const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightid}`)
            if (res.meta.status !== 200)
                return this.$message.error('删除权限失败')

            role.children = res.data
        },
        //分配权限
        async showSetRightDialog(role) {
            this.roleId = role.id
            const { data: res } = await this.$http.get('rights/tree')
            if (res.meta.status !== 200)
                return this.$message.error('获取角色列表数据失败')
            this.rightLis = res.data
            // console.log(res)
            this.getLeafKeys(role, this.defkeys)
            this.setRightDialogVisible = true
        },
        //递归获取角色下的三级权限
        getLeafKeys(node, arr) {
            if (!node.children) {
                return arr.push(node.id)
            }
            node.children.forEach(item => this.getLeafKeys(item, arr));
        },
        //对话框关闭清空权限分配勾选状态
        setRightDialogClosed() {
            this.defkeys = []
        },
        //保存勾选信息,发送请求
        async allotRights() {
            //通过tree组件的getCheckedKeys()和getHalfCheckedKeys()方法得到所有的勾选状态然后拼接成字符串发送post的请求更新数据
            const keys = [...this.$refs.treeref.getCheckedKeys(),
            ...this.$refs.treeref.getHalfCheckedKeys()]

            const idStr = keys.join(',')
            const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr })
            if (res.meta.status !== 200)
                return this.$message.error('更新权限失败')

            this.$message.success('更新权限成功')
            console.log(res)
            this.getRolesList()
            this.setRightDialogVisible = false
        }
        //添加角色信息


    }
}
</script>

<style lang="less" scoped>
.el-card {
    margin-top: 20px;
}

.el-tag {
    margin: 10px;
}

.bdtop {
    border-top: 1px solid #eee;
}

.bdbottom {
    border-bottom: 1px solid #eee;
}

.vcenter {
    display: flex;
    align-items: center;
}

/deep/.el-input__inner {
    width: 80%;
    margin-left: 70px;

}

/deep/.el-form-item__label {
    padding: 0px;
    text-align: center;
    width: 80px;
}
</style>
