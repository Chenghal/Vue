<!--  -->
<template>
    <div>
        <!-- 面包屑区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card>
            <el-row>
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="querInfo.query" clearable @clear="getGoodsList">
                        <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="goAddPage">添加商品</el-button>
                </el-col>
            </el-row>
            <!-- 表格区域 -->
            <el-table :data=goodsList border stripe>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="商品名称" prop="goods_name"></el-table-column>
                <el-table-column label="商品价格（元）" prop="goods_price" width="95px"></el-table-column>
                <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
                <el-table-column label="创建时间" prop="add_time" width="140px">
                    <template slot-scope="scope">
                        {{ scope.row.add_time | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="130px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                            @click="removeById(scope.row.goods_id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="querInfo.pagenum" :page-sizes="[10, 15, 20, 30]" :page-size="100"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            querInfo: {
                query: '',
                pagenum: 1,
                pagesize: 10
            },
            goodsList: [],
            total: 0
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        async getGoodsList() {
            const { data: res } = await this.$http.get('goods', { params: this.querInfo })
            if (res.meta.status !== 200)
                return this.$message.error('获取商品列表失败')
            this.$message.success('获取商品列表成功')
            this.total = res.data.total
            this.goodsList = res.data.goods
            console.log(this.goodsList)
        },
        handleSizeChange(newSize) {
            this.querInfo.pagesize = newSize
            this.getGoodsList()
        },
        handleCurrentChange(newNum) {
            this.querInfo.pagenum = newNum
            this.getGoodsList()
        },
        async removeById(id) {
            const confirmResult = await this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消删除')
            }
            const { data: res } = await this.$http.delete(`goods/${id}`)
            if (res.meta.status !== 200)
                return this.$message.error('删除商品失败')
            this.$message.success('删除商品成功')
            this.getGoodsList()
        },
        goAddPage() {
            this.$router.push('/goods/add')
        }
    }
}
</script>

<style lang="less" scoped>
.el-card {
    margin-top: 20px;
}
</style>
