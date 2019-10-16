<template>
    <div class="app-wrap">
        <router-view></router-view>
        <el-dialog center width="30%" :visible.sync="showLoginDialog">
            <div class="_login-wrap">
                <login-form titleColor="color-black" @loginSuccess="loginSuc"/>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import loginForm from '@/components/loginForm'
    import {createNamespacedHelpers} from 'vuex'

    const {mapMutations} = createNamespacedHelpers('login');
    export default {
        components:{loginForm},
        computed:{
            showLoginDialog:{
                get(){
                    return this.$store.state.login.showLoginDialog
                },
                set(value){
                    this.setShowLoginDialog(value)
                }
            }
        },
        methods:{
            ...mapMutations({
                setShowLoginDialog:'setShowLoginDialog'
            }),
            loginSuc(){
                this.setShowLoginDialog(false)
            }
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
._login-wrap{
    position: relative;
    height: 310px;
}
</style>