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
        <el-dialog center :visible.sync="showDialog">
            <credit-or-edit ref="creditOrEdit"></credit-or-edit>
        </el-dialog>
    </div>
</template>

<script>
    import {announcementStatus} from '@/utils/constents'
    import TableBox from '@/components/tableBox'
    import SearchPannel from '@/components/search-pannel'
    import colorText from '@/components/color-text'
    import creditOrEdit from './createOrEdit'
    import {createNamespacedHelpers} from 'vuex'
    const {mapState} = createNamespacedHelpers('announcement');

    export default {
        name: "notice",
        components:{TableBox,SearchPannel,colorText,creditOrEdit},
        created() {
            this.statusMap = announcementStatus;
        },
        data(){
            return {
                queryParams:{status:''},
                pagination: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0
                },
                showDialog:true
            }
        },
        computed:{
            ...mapState({
                list:'list'
            })
        },
        methods:{
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
            handleEditClick(){},
            queryList(){}
        }
    }
</script>

<style scoped>

</style>