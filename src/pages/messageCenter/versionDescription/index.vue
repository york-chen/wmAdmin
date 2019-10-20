<template>
    <div class="page-wrap">
        <SearchPannel>
            <div slot="condition">
                <el-select v-model="queryParams.status" placeholder="请选择">
                    <el-option
                            v-for="item in statusMap.get('all')"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div slot="operation">
                <el-button @click="handleAddClick" type="primary">新增</el-button>
            </div>
        </SearchPannel>
        <TableBox v-model="pagination" :action="queryList" class="table">
            <el-table :data="list">
                <el-table-column label="编号"
                                 type="index"
                                 :index="indexMethod">
                </el-table-column>
                <el-table-column prop="submitTime"
                                 label="提交时间">
                </el-table-column>
                <el-table-column prop="eventType" label="事件类别">
                </el-table-column>
                <el-table-column prop="creator" label="发布者">
                </el-table-column>
                <el-table-column prop="area" label="发布区组">
                </el-table-column>
                <el-table-column prop="publishTime" label="计划发布时间">
                </el-table-column>
                <el-table-column prop="endTime" label="计划结束时间">
                </el-table-column>
                <el-table-column prop="status" label="当前状态">
                    <template slot-scope="{row}">
                        <color-text :type="formatStatusType(row.status)">{{statusMap.get(row.status)}}</color-text>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="{row}">
                        <el-button @click="handleEditClick(row)" type="text">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </TableBox>
        <el-dialog width="40%" center :visible.sync="showDialog">
            <credit-or-edit v-if="showDialog" ref="creditOrEdit"></credit-or-edit>
            <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="submitForm">提交审核</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    import {versionDescStatus} from '@/utils/constents'
    import TableBox from '@/components/tableBox'
    import SearchPannel from '@/components/search-pannel'
    import colorText from '@/components/color-text'
    import creditOrEdit from './createOrEdit'
    import {createNamespacedHelpers} from 'vuex'
    const {mapState} = createNamespacedHelpers('versionDesc');

    export default {
        name: "versionDesc",
        components:{TableBox,SearchPannel,colorText,creditOrEdit},
        created() {
            this.statusMap = versionDescStatus;
        },
        data(){
            return {
                queryParams:{status:''},
                pagination: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0
                },
                showDialog:false
            }
        },
        computed:{
            ...mapState({
                list:'list'
            })
        },
        methods:{
            openDialog(){
                this.showDialog = true;
            },
            closeDialog(){
                this.showDialog = false
            },
            indexMethod(index) {
                return index +1;
            },
            formatStatusType(status){
                let type = 'primary';
                switch (status) {
                    case '1':type = "primary";break;
                    case '2':type = "success";break;
                    case '3':type = "danger";break;
                }
            },
            handleEditClick(row){
                this.openDialog();
                this.$nextTick(()=>{
                    this.$refs['creditOrEdit'].initFormData(row);
                })
            },
            handleAddClick(){
                this.openDialog();
            },
            submitForm(){
                let data = this.$refs['creditOrEdit'].getData();
                console.log(data);
                if(data){
                    if(data.id){//编辑
                        this.sendEditItem(data);
                    }else {//新增
                        this.sendAddItem(data);
                    }
                }
            },
            sendAddItem(data){},
            sendEditItem(data){},
            queryList(){}
        }
    }
</script>

<style scoped>

</style>