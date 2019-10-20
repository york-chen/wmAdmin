<template>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="form-wrap">
        <el-form-item label="版本号" prop="versionNum">
            <el-input v-model="form.versionNum"></el-input>
        </el-form-item>
        <el-form-item label="版本内容" prop="content">
            <el-input type="textarea" :rows="5" v-model="form.content"></el-input>
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
                versionNum: [{required: true, message: '请选择图片模板', trigger: 'change'}],
                content: [{required: true, message: '请选择公告模板', trigger: 'change'}],
                area: [{required: true, message: '请选择发布区组', trigger: 'change'}],
                publishTime: [{required: true, message: '请选择定时发布时间', trigger: 'change'}]
            }
        },
        data(){
            return{
                form:{
                    versionNum:'',
                    content:'',
                    area:'',
                    publishTime:''
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

</style>