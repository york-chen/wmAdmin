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
                <el-table-column prop="publishAreaCode" label="发布区组">
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
                        <asyncButton size="mini" label="修改" @_click="handleEditClick" :arguments="row.businessId" type="primary"></asyncButton>
                    </template>
                </el-table-column>
            </el-table>
        </TableBox>
        <el-dialog center :visible.sync="showDialog">
            <credit-or-edit v-if="showDialog" ref="creditOrEdit"></credit-or-edit>
            <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <asyncButton label="提交审核" @_click="submitForm" type="primary" exec_label="正在提交"></asyncButton>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    import {battlepassMallAdStatus,eventTypeMap} from '@/utils/constents'
    import TableBox from '@/components/tableBox'
    import SearchPannel from '@/components/search-pannel'
    import colorText from '@/components/color-text'
    import creditOrEdit from './createOrEdit'
    import asyncButton from '@/components/asyncButton'
    import triggerSearch from '@/mixins/triggerSearch'
    import {createNamespacedHelpers} from 'vuex'
    const {mapState,mapActions} = createNamespacedHelpers('battlepassMallAd');

    export default {
        name: "notice",
        mixins:[triggerSearch],
        components:{TableBox,SearchPannel,colorText,creditOrEdit,asyncButton},
        created() {
            this.statusMap = battlepassMallAdStatus;
            this.eventTypeMap = eventTypeMap;
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
                tableLoading:false
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
                sendCreate:'sendCreate',
                sendEdit:'sendEdit',
                sendQueryDetail:'sendQueryDetail'
            }),
            openDialog(){
                this.showDialog = true;
            },
            closeDialog(){
                this.showDialog = false
            },
            queryDetail(id){
                return this.sendQueryDetail({businessId:id})
            },
            handleEditClick(promise,id){
                promise(Promise.all([this.getAreaLanguageData(),this.queryDetail(id)]).then((res)=>{
                    this.openDialog();
                    let data = res[1];
                    data.filelist = data.imgs.map(item=>({imgCode:item.imgCode,url:item.url,_url:item.url}));
                    this.$nextTick(()=>{
                        this.$refs['creditOrEdit'].initFormData(data);
                    })
                }));
            },
            handleAddClick(promise){
                promise(this.getAreaLanguageData().then(()=>{
                    this.openDialog();
                }))
            },
            submitForm(promise){
                let data = this.$refs['creditOrEdit'].getData();
                console.log(data);
                if(data){
                    if(data.businessId){//编辑
                        promise(this.sendEditItem(data));
                    }else {//新增
                        promise(this.sendAddItem(data));
                    }
                }
            },
            sendAddItem(data){
                return this.sendCreate(data).then(()=>{
                    this.$message.success('操作成功！')
                    this.closeDialog();
                    this.queryList();
                })
            },
            sendEditItem(data){
                return this.sendEdit(data).then(()=>{
                    this.$message.success('操作成功！')
                    this.closeDialog();
                    this.pagination.pageIndex = 1;
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
                    this.tableLoading = false;
                    this.pagination.total = res.total;
                }).catch(()=>{this.tableLoading = false})
            }
        },
        mounted(){
            this.queryList();
        }
    }
</script>

<style scoped>

</style>