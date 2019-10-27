<template>
    <div class="page-wrap">
        <SearchPannel>
            <div slot="condition">
                <el-select @change="queryStatusChange" v-model="queryParams.status" placeholder="请选择">
                    <el-option
                            v-for="item in statusMap.get('all')"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div slot="operation">
                <asyncButton label="新增" @_click="handleAddClick" type="primary" exec_label="加载中"></asyncButton>
            </div>
        </SearchPannel>
        <TableBox v-model="pagination" :action="queryList" class="table">
            <el-table v-loading="tableLoading" :data="list">
                <el-table-column label="编号"
                        type="index"
                        :index="indexMethod">
                </el-table-column>
                <el-table-column prop="submitTime"
                                 label="提交时间">
                </el-table-column>
                <el-table-column label="事件类别">
                    <template slot-scope="{row}">{{eventTypeMap.get(row.businessType)}}</template>
                </el-table-column>
                <el-table-column prop="publisherName" label="发布者">
                </el-table-column>
                <el-table-column prop="publishArea" label="发布区组">
                </el-table-column>
                <el-table-column prop="planPubStartTime" label="计划发布时间">
                </el-table-column>
                <el-table-column prop="planPubEndTime" label="计划结束时间">
                </el-table-column>
                <el-table-column label="当前状态">
                    <template slot-scope="{row}">
                        <color-text :type="formatStatusType(row.status)">{{statusMap.get(row.status)}}</color-text>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="{row}">
                        <asyncButton size="mini" label="查看" @_click="handleViewClick" :arguments="row" type="primary"></asyncButton>
                        <asyncButton v-if="row.status==='DRAFT'||row.status==='REJECT'" size="mini" label="修改" @_click="handleEditClick" :arguments="row.businessId" type="primary"></asyncButton>
                    </template>
                </el-table-column>
            </el-table>
        </TableBox>
        <el-dialog width="960px" center :visible.sync="showDialog">
            <credit-or-edit :operateType="operateType" v-if="showDialog" ref="creditOrEdit"></credit-or-edit>
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
    import {announcementStatus,eventTypeMap} from '@/utils/constents'
    import TableBox from '@/components/tableBox'
    import SearchPannel from '@/components/search-pannel'
    import colorText from '@/components/color-text'
    import creditOrEdit from './createOrEdit'
    import triggerSearch from '@/mixins/triggerSearch'
    import asyncButton from '@/components/asyncButton'
    import {createNamespacedHelpers} from 'vuex'
    const {mapState,mapActions} = createNamespacedHelpers('announcement');

    export default {
        name: "notice",
        mixins:[triggerSearch],
        components:{TableBox,SearchPannel,colorText,creditOrEdit,asyncButton},
        created() {
            this.statusMap = announcementStatus;
            this.eventTypeMap = eventTypeMap;
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
                showDialog:false,
                tableLoading:false,
                operateType:'add',
                btnState:[0,0,0,0]
            }
        },
        computed:{
            ...mapState({
                list:'list'
            })
        },
        methods:{
            ...mapActions({
                sendGetList:'sendGetList',
                sendCreateAnnouncement:'sendCreateAnnouncement',
                sendEditAnnouncement:'sendEditAnnouncement',
                sendQueryAnnouncement:'sendQueryAnnouncement'
            }),
            openDialog(){
              this.showDialog = true;
            },
            closeDialog(){
              this.showDialog = false
            },
            queryDetail(id){
                return this.sendQueryAnnouncement({businessId:id})
            },
            handleViewClick(promise,row){
                this.operateType = 'view';
                this.viewData = row;
                this.readyForData(promise,row.businessId);
            },
            readyForData(promise,id){
                promise(Promise.all([this.getAreaLanguageData(),this.queryDetail(id)]).then((res)=>{
                    this.openDialog();
                    //处理一下 数据
                    let data = res[1];
                    if(data.showButton){
                        let btns = data.showButton.split(',');
                        data.imgs = data.imgs.map((item,index)=>({imgCode:item.imgCode,url:item.url,buttonId:btns[index]==='0'?'':btns[index]}));
                    }
                    this.$nextTick(()=>{
                        this.$refs['creditOrEdit'].initFormData(data);
                    })
                }));
            },
            handleEditClick(promise,id){
                this.operateType = 'edit';
                this.readyForData(promise,id);
            },
            handleAddClick(promise){
                this.operateType = 'add';
                promise(this.getAreaLanguageData().then(()=>{
                    this.openDialog();
                }))
            },
            submitForm(promise){
              let data = this.$refs['creditOrEdit'].getData();
              if(data){
                if(data.businessId){//编辑
                    promise(this.sendEditItem(data));
                }else {//新增
                    promise(this.sendAddItem(data));
                }
              }
            },
            sendAddItem(data){
                return this.sendCreateAnnouncement(data).then(()=>{
                    this.$message.success('操作成功！')
                    this.closeDialog();
                    this.pagination.pageIndex = 1;
                    this.queryList();
                })
            },
            sendEditItem(data){
                return this.sendEditAnnouncement(data).then(()=>{
                    this.$message.success('操作成功！');
                    this.closeDialog();
                    this.queryList();
                })
            },
            queryList(){
                this.tableLoading = true;
                this.sendGetList({
                    status:this.queryParams.status,
                    pageIndex:this.pagination.pageIndex,
                    pageSize : this.pagination.pageSize
                }).then(res=>{
                    this.tableLoading = false
                    this.pagination.total = res.total;
                }).catch(()=>{this.tableLoading = false})
            }
        },
        mounted() {
            this.queryList();
        }
    }
</script>

<style scoped>

</style>