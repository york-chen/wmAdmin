<template>
    <div class="form-wrap">
        <el-form size="medium" :model="targetUser" :rules="rules" ref="userForm" label-width="100px">
            <el-form-item label="用户名" prop="username">
                <el-input placeholder="请输入用户名" v-model="targetUser.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input placeholder="请输入6-12位密码" v-model="targetUser.password"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="position">
                <el-input placeholder="请输入所属部门" v-model="targetUser.position"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="role">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">不限</el-checkbox>
                <el-checkbox-group @change="handleCheckedCitiesChange" v-model="targetUser.role">
                    <el-checkbox v-for="item in optionArr" :key="item.value" :label="item.value" name="_role">{{item.text}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="验证码" prop="captcha">
                <el-col :span="15">
                    <el-form-item>
                        <el-input
                                placeholder="请输入验证码"
                                v-model="targetUser.captcha">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">&nbsp;</el-col>
                <el-col :span="7">
                    <el-form-item>
                        <picture-verifier :width="114" :height="40" ref="picVer" />
                    </el-form-item>
                </el-col>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import pictureVerifier from '@/components/PictureVerifier'
    import {jurisdictionMenu} from '@/config/constents'
    import {createNamespacedHelpers} from 'vuex'
    const {mapState} = createNamespacedHelpers('admin/user');
    export default {
        name: "addOrEditAccount",
        components:{pictureVerifier},
        created(){
            this.rules = {
                username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                captcha: [{required: true, message: '请输入验证码', trigger: 'blur'}],
                position: [{required: true, message: '请输入用户部门', trigger: 'change'}]
            };
        },
        data(){
            return {
                checkAll:false,
                isIndeterminate:false,
                optionArr:jurisdictionMenu
            }
        },
        computed:{
            ...mapState({
                targetUser:'targetUser'
            })
        },
        methods:{
            checkForm(){
                let flag = false;
                this.$refs['userForm'].validate((valid) => {
                    flag = valid
                });
                return flag;
            },
            handleCheckAllChange(val) {
                this.targetUser.role = val ? this.optionArr.map(item=>item.value) : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.optionArr.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.optionArr.length;
            }
        },
        mounted() {
            this.handleCheckedCitiesChange(this.targetUser.role)
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    .form-wrap{
        .img-code{
            width: 100%;
            height: 40px;
        }
    }
</style>