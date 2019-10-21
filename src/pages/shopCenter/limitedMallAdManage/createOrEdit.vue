<template>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="form-wrap">
        <el-form-item label="广告选择">
            <el-select v-model="form.type" placeholder="请选择公告模板">
                <el-option label="广告样式一" value="1"></el-option>
                <el-option label="广告样式二" value="2"></el-option>
                <el-option label="广告样式三" value="3"></el-option>
                <el-option label="广告样式四" value="4"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="图片上传" prop="filelist">
            <upload-file :limit="3" v-model="form.filelist"></upload-file>
        </el-form-item>
        <el-form-item v-if="form.filelist.length" label="图片预览">
            <div class="preview-wrap">
                <template v-for="item in form.filelist">
                    <img class="preview" :src="item.url" :key="item.id" alt="">
                </template>
            </div>
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
    import uploadFile from '@/components/upload-img'
    import areaMixin from '@/mixins/area-group'
    import colorText from '@/components/color-text'
    export default {
        components:{uploadFile,colorText},
        mixins:[areaMixin],
        created(){
            this.rules = {
                template: [{required: true, message: '请选择图片模板', trigger: 'change'}],
                type: [{required: true, message: '请选择公告模板', trigger: 'change'}],
                title: [{required: true, message: '请输入公告标题', trigger: 'blur'}],
                content: [{required: true, message: '请输入公告内容', trigger: 'blur'}],
                btns: [{required: true, message: '请选择显示按钮', trigger: 'change'}],
                area: [{required: true, message: '请选择发布区组', trigger: 'change'}],
                publishTime: [{required: true, message: '请选择定时发布时间', trigger: 'change'}],
                stopTime: [{required: true, message: '请选择定时关闭时间', trigger: 'change'}],
                filelist: [{required: true, message: '请上传图片', trigger: 'change'}],
            }
        },
        data(){
            return{
                form:{
                    type:'text',
                    template:'',
                    title:'',
                    content:'',
                    btns:[],
                    area:'',
                    publishTime:'',
                    stopTime:'',
                    filelist:[]
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
                })
                return flag?this.form:flag;
            }
        }
    }
</script>
<style type="text/scss" lang="scss">
    .preview-wrap{
        display: flex;
        flex-direction: row;
        .preview{
            width: 25%;
            margin-right: 5%;
        }
    }
</style>