<template>
    <div class="page-wrap">
        <div class="operate-wrap">
            <el-tabs v-model="level" @tab-click="handleTabsClick" tab-position="top">
                <el-tab-pane label="所有用户" name="all"></el-tab-pane>
                <el-tab-pane label="一类用户" name="1"></el-tab-pane>
                <el-tab-pane label="二类用户" name="2"></el-tab-pane>
                <el-tab-pane label="三类用户" name="3"></el-tab-pane>
            </el-tabs>
            <el-button @click="handleAddClick('add')" class="add cxt-btn" size="mini">添加账号</el-button>
        </div>
        <TableBox :pagination="pagination"
                  class="table">
            <el-table :data="list">
                <el-table-column prop="username"
                        label="用户名">
                </el-table-column>
                <el-table-column prop="position" label="所属部门">
                </el-table-column>
                <el-table-column prop="role" label="权限">
                    <template slot-scope="{row}">
                        {{formatRoleData(row.role)}}
                    </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="创建日期">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="{row}">
                        <el-button @click="handleEditClick(row)" type="text">编辑</el-button>
                        <el-button @click="handleDeleteClick(row)" type="text" class="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </TableBox>
        <el-dialog center :visible.sync="showDialog" :width="'40%'" :title="dialogTitle">
            <AddOrEditAccount ref="addOrEditAccount" v-if="showDialog"/>
            <div slot="footer">
                <AsyncButton @_click="saveData" type="primary" exec_label="保存中" label="确 定"/>
                <el-button class="cxt-btn" @click="showDialog=false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import TableBox from '@/components/tableBox'
    import AsyncButton from '@/components/asyncButton'
    import AddOrEditAccount from './addOrEditAccount'
    import {jurisdictionMenu} from '@/config/constents'
    import {createNamespacedHelpers} from 'vuex'
    const {mapState, mapActions,mapMutations} = createNamespacedHelpers('admin/user');
    export default {
        components:{TableBox,AsyncButton,AddOrEditAccount},
        data(){
            return {
                showDialog:false,
                dialogTitle:'添加用户',
                level:'all',
                pagination: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0,
                    handleCurrentChange: (pageIndex) => {
                        this.pagination.pageIndex = pageIndex;
                        this.queryList();
                    },
                    handleSizeChange(pageSize) {
                        this.pagination.pageIndex = 1;
                        this.pagination.pageSize = pageSize;
                        this.queryList();
                    }
                }
            }
        },
        computed:{
          ...mapState({
              list:'list',
              targetUser:'targetUser'
          })
        },
        methods:{
            ...mapMutations({
                setTargetUser:'setTargetUser'
            }),
            ...mapActions({
                sendRegistry:'sendRegistry',
                sendGetUserAccountList:'sendGetUserAccountList',
                sendUpdateUser:'sendUpdateUser',
                sendDeleteUser:'sendDeleteUser'
            }),
            formatRoleData(role){
                let arr = jurisdictionMenu.filter(item=>{
                    return item.value & role;
                });
                return arr.map(item=>item.text).join(',')
            },
            handleTabsClick(obj){
                this.level = obj.name;
                this.queryList();
            },
            queryList(){
                let params = {
                    page:this.pagination.pageIndex,
                    limit:this.pagination.pageSize,
                    level:this.level
                };
                if(params.level === 'all'){
                    delete params.level
                }
                this.sendGetUserAccountList(params);
            },
            saveData(){
                let flag = this.$refs['addOrEditAccount'].checkForm();
                if(!flag)return;
                if(this.targetUser._id){//编辑
                    this.actionEdit();
                }else{//新增
                    this.actionAdd();
                }
            },
            openDialog(type){
                if(type === 'add'){
                    this.dialogTitle = '添加用户'
                }else if(type === 'edit'){
                    this.dialogTitle = '更新用户'
                }
                this.showDialog = true;
            },
            closeDialog(){
                this.showDialog = false;
            },
            handleAddClick(){
                this.setTargetUser({
                    username:'',
                    password:'',
                    captcha:'',
                    role:[],
                    position:''
                });
                this.openDialog('add');
            },
            actionAdd(){
                let postData = {...this.targetUser};
                postData.role = postData.role.reduce((total,num)=>{
                    return total + parseInt(num)
                },0);
                this.sendRegistry(postData).then(()=>{
                    this.$message.success('操作成功');
                    this.closeDialog();
                    this.queryList();
                })
            },
            actionEdit(){
                let target = this.targetUser;
                let postData = {
                    id:target._id,
                    password:target.password,
                    role:target.role,
                    position:target.position,
                    isAdmin:target.isAdmin
                };
                postData.role = postData.role.reduce((total,num)=>{
                    return total + parseInt(num)
                },0);
                this.sendUpdateUser(postData).then(()=>{
                    this.$message.success('操作成功');
                    this.closeDialog();
                    this.queryList();
                })
            },
            handleEditClick(row){
                let arr = [];
                jurisdictionMenu.forEach(item=>{
                   if(parseInt(row.role) & item.value){
                       arr.push(item.value)
                   }
                });
                this.setTargetUser({
                    ...row,
                    captcha:'',
                    role:arr
                });
                this.openDialog('edit');
            },
            handleDeleteClick(row){
                this.$confirm('删除账户后该账户将无法正常使用，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.sendDeleteUser({
                        id:row._id
                    }).then(()=>{
                        this.$message.success('操作成功');
                        this.queryList();
                    })
                })
            }
        },
        mounted(){
            this.queryList();
        }
    }

</script>
<style lang="scss" type="text/scss" scoped>
.danger{
    color: #F45252;
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