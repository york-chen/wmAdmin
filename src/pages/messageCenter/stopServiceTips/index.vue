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
                <el-table-column label="编号" type="index"></el-table-column>
                <el-table-column prop="submitTime" label="提交时间"></el-table-column>
                <el-table-column prop="eventType" label="事件类别"></el-table-column>
                <el-table-column prop="creator" label="发布者"></el-table-column>
                <el-table-column prop="area" label="发布区组"></el-table-column>
                <el-table-column prop="publishTime" label="计划发布时间"></el-table-column>
                <el-table-column prop="endTime" label="计划结束时间"></el-table-column>
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
        <el-dialog center :visible.sync="showDialog">
            <credit-or-edit v-if="showDialog" ref="creditOrEdit"></credit-or-edit>
            <span slot="footer" class="dialog-footer">
                <template v-if="btnStatus._showSave">
                    <asyncButton  label="保存" @_click="submitForm" type="primary" exec_label="保存中"></asyncButton>
                </template>
                <template v-if="btnStatus._showApproval">
                    <asyncButton  label="提交审核" @_click="submitApproval" type="primary" exec_label="正在提交"></asyncButton>
                </template>
                <template v-if="btnStatus._showPublish">
                    <asyncButton  label="发布" @_click="publishAction" type="primary" exec_label="发布中"></asyncButton>
                </template>
                <template v-if="btnStatus._showCancel">
                    <asyncButton  label="撤回" @_click="cancelAction" type="primary" exec_label="撤回中"></asyncButton>
                </template>
                <template v-if="btnStatus._showRepublish">
                    <asyncButton  label="重新发布" @_click="republishAction" type="primary" exec_label="发布中"></asyncButton>
                </template>
                <template v-if="btnStatus._showDelay">
                    <asyncButton  label="延迟发布" @_click="delayAction" type="primary" exec_label="提交中"></asyncButton>
                </template>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {stopServiceStatus} from '@/utils/constents'
    import TableBox from '@/components/tableBox'
    import SearchPannel from '@/components/search-pannel'
    import colorText from '@/components/color-text'
    import creditOrEdit from './createOrEdit'
    import {createNamespacedHelpers} from 'vuex'
    const {mapState} = createNamespacedHelpers('stopService');

    export default {
        name: "stopService",
        components:{TableBox,SearchPannel,colorText,creditOrEdit},
        created() {
            this.statusMap = stopServiceStatus;
            this.viewData = {}//当弹出框模式为查看的时候的json数据
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