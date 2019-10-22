<template>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="form-wrap">
        <el-form-item prop="content" label="提示内容">
            <el-input v-model="form.content" type="textarea" placeholder="请输入停机维护中的提示信息" rows="5"></el-input>
        </el-form-item>
        <el-form-item label="发布区组" prop="area">
            <el-select v-model="form.area" placeholder="请选择发布区组">
                <el-option label="上海" value="shanghai"></el-option>
                <el-option label="北京" value="beijing"></el-option>
            </el-select>
            <color-text type="warning">提示：请注意图片或文字是否与选择服务器一致</color-text>
        </el-form-item>
        <el-form-item label="定时发布" prop="publishTime">
            <el-date-picker
                    v-model="form.publishTime"
                    type="datetime"
                    placeholder="选择定时发布时间">
            </el-date-picker>
            {{_publishTime}}
        </el-form-item>
        <el-form-item label="定时关闭" prop="stopTime">
            <el-date-picker
                    v-model="form.stopTime"
                    type="datetime"
                    placeholder="选择定时关闭时间">
            </el-date-picker>
            {{_stopTime}}
        </el-form-item>
    </el-form>
</template>
<script>
    import areaMixin from '@/mixins/area-group'
    import colorText from '@/components/color-text'
    export default {
        components:{colorText},
        mixins:[areaMixin],
        created(){
            this.rules = {
                content: [{required: true, message: '请填写停机维护中的提示信息', trigger: 'change'}],
                area: [{required: true, message: '请选择发布区组', trigger: 'change'}],
                publishTime: [{required: true, message: '请选择定时发布时间', trigger: 'change'}],
                stopTime: [{required: true, message: '请选择定时关闭时间', trigger: 'change'}],
            }
        },
        data(){
            return{
                form:{
                    content:'',
                    area:'',
                    publishTime:'',
                    stopTime: ''
                }
            }
        },
        methods:{
            initFormData(data){
                this.form = {
                    ...this.form,
                    ...data
                }
            },
            getData(){
                let flag = false;
                this.$refs['form'].validate(valid=>{
                    flag = valid;
                });
                return flag?this.form:flag;
            }
        }
    }
</script>
<style type="text/scss" lang="scss">
    .form-wrap{
        .strong{
            font-weight: bold;
        }
    }
</style>