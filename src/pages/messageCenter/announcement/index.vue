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
                <el-button @click="handleAddClick" type="primary">新增</el-button>
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
                        <el-button @click="handleEditClick(row)" type="text">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </TableBox>
        <el-dialog center :visible.sync="showDialog">
            <credit-or-edit v-if="showDialog" ref="creditOrEdit"></credit-or-edit>
            <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="submitForm">提交审核</el-button>
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
    import {createNamespacedHelpers} from 'vuex'
    const {mapState,mapActions} = createNamespacedHelpers('announcement');

    export default {
        name: "notice",
        mixins:[triggerSearch],
        components:{TableBox,SearchPannel,colorText,creditOrEdit},
        created() {
            this.statusMap = announcementStatus;
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
                sendGetList:'sendGetList'
            }),
            openDialog(){
              this.showDialog = true;
            },
            closeDialog(){
              this.showDialog = false
            },
            indexMethod(index) {
                return index +1;
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