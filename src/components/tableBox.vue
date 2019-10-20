<template>
    <el-card>
        <div class="table-box">
            <div :class="{ 'table-box-border': border }" class="table-box-container">
                <slot></slot>
            </div>
            <div class="table-box-pagination" v-if="pagination">
                <el-pagination
                        :layout="layout"
                        :current-page="pagination.pageIndex || 1"
                        :page-size="pagination.pageSize || 10"
                        :page-sizes="pageSizes"
                        :total="pagination.total || 0"
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                >
                </el-pagination>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        model:{
            prop:'pagination',
            event:'change'
        },
        data() {
            return {}
        },
        props: {
            pagination: [Boolean, Object],
            action:[Function],
            layout: {
                type: String,
                default: 'total, sizes, prev, pager, next, jumper'
            },
            pageSizes: {
                type: Array,
                default: () => [10, 20, 30, 40]
            },
            border: {
                type: Boolean,
                default: false
            }
        },
        methods:{
            handleCurrentChange(pageIndex){
                this.pagination.pageIndex = pageIndex;
                this.$emit('change',this.pagination);
                this.action && this.action();
            },
            handleSizeChange(pageSize) {
                console.log(this.pagination)
                this.pagination.pageIndex = 1;
                this.pagination.pageSize = pageSize;
                this.$emit('change',this.pagination);
                this.action && this.action();
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    .table-box {
        .table-box-pagination {
            text-align: right;
            margin-top: 20px;
        }

        .table-box-border {
            border: 1px solid #eee;
            border-bottom: 0;
        }
    }
</style>
