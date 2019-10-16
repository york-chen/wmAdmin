<template>
    <div class="page-wrap">
        <div class="operate-wrap">
            <el-tabs v-model="curTab" @tab-click="handleTabsClick" tab-position="top">
                <el-tab-pane label="所有记录" name="all"></el-tab-pane>
                <el-tab-pane label="标记" name="marked"></el-tab-pane>
                <el-tab-pane label="未标记" name="unmarked"></el-tab-pane>
            </el-tabs>
            <el-button @click="exportRecord" class="add cxt-btn" size="mini">导出查询记录</el-button>
        </div>
        <TableBox :pagination="pagination"
                  class="table">
            <el-table :data="list">
                <el-table-column
                        prop="name"
                        label="企业名称">
                </el-table-column>
                <el-table-column prop="apiName" label="查询接口名称"></el-table-column>
                <el-table-column prop="user.username" label="用户名">
                </el-table-column>
                
                <el-table-column prop="user.position" label="查询账号用户职业">
                </el-table-column>
                <el-table-column prop="createdAt" label="查询日期">
                </el-table-column>
                <el-table-column prop="updateAt" label="更新记录时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope=" { row, column, $index }">
                        <el-button v-if="row.marked==true" type="text" @click="handleMark(row,false,$index)" >取消标记</el-button>
                        <el-button v-else type="text" class="cancel" @click="handleMark(row,true,$index)" >标记</el-button>
                        <el-button type="text" class="danger" @click="handleDeleteClick(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </TableBox>
    </div>
</template>
<script>
    import TableBox from '@/components/tableBox'
    import AsyncButton from '@/components/asyncButton'
    import {$axGetRecordList,$axUpdateRecord,$axDeleteRecord} from '../../../_axios/api/admin/recordList'
    export default {
        components:{TableBox,AsyncButton},
        data(){
            return {
                curTab:'all',
                list:[],
                pagination: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0,
                    handleCurrentChange: (pageIndex) => {
                        this.pagination.pageIndex = pageIndex;
                        this.queryList({page:pageIndex,limit:10})
                    },
                    handleSizeChange(pageSize) {
                        this.pagination.pageIndex = 1;
                        this.pagination.pageSize = pageSize;
                        this.queryList({page:this.pagination.pageIndex,limit:pageSize})
                    }
                }
            }
        },
        created(){
            this.queryList({page:1,limit:10})
        },
        methods:{
            queryList(param){
                $axGetRecordList({...param}).then(res=>{
                    this.list = res.items;
                    // this.pagination.pageSize = 10;
                    this.pagination.total = res.total;
                    console.log('this.list',this.list)
                })
            },
            handleTabsClick(obj){
                this.curTab = obj.name;
                let param = {page:1,limit:10};
                if(this.curTab.name != 'all') param.status = obj.name;
                console.log('param:',param);
                this.queryList(param);
            },
            handleDeleteClick(row){
                console.log('now row:',row);
                this.$confirm('确认删除本条记录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    $axDeleteRecord({id:row._id}).then(res=>{
                        this.$message.success('删除成功!');
                        let param = {page:1,limit:10};
                        if(this.curTab.name != 'all') param.status = this.curTab.name;
                        this.queryList(param);
                    })
                })
            },
            handleMark(row,marked,index){
                console.log('now row:',index);
                $axUpdateRecord({id:row._id,marked:marked}).then(res=>{
                    this.$message.success('修改成功!marked:'+marked);
                    this.list[index].marked = marked;
                    // let param = {page:1,limit:10};
                    // if(this.curTab.name != 'all') param.status = this.curTab.name;
                    // this.queryList(param);
                })
            },
            exportRecord(){}
        }
    }

</script>
<style lang="scss" type="text/scss" scoped>
    .danger{
        color: #F45252;
    }
    .cancel{
        color: #FF8F43;
    }
    .cxt-btn{
        color: #436FFF;
        border: 1px solid #436FFF;
    }
    .operate-wrap{
        position: relative;
        .add{
            position: absolute;
            top: 5px;
            right: 0;
        }
    }
</style>