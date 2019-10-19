<template>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="form-wrap">
        <el-form-item label="公告模板" prop="template">
            <el-select v-model="form.template" placeholder="请选择活动区域">
                <el-option label="文字模板" value="shanghai"></el-option>
                <el-option label="图片模板" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="公告标题" prop="title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
            <el-input type="textarea" :rows="5" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="图片上传" prop="content">
            <upload-file></upload-file>
        </el-form-item>
        <el-form-item label="显示按钮" prop="btns">
            <el-radio-group v-model="form.btns">
                <el-radio label="传奇商城"></el-radio>
                <el-radio label="版本说明"></el-radio>
                <el-radio label="battle pass"></el-radio>
            </el-radio-group>
        </el-form-item>
        <area-group></area-group>
    </el-form>
</template>
<script>
    import uploadFile from '@/components/upload-file'
    import areaGroup from '@/components/area-group'
    export default {
        components:{uploadFile,areaGroup},
        created(){
            this.rules = {
                template: [{required: true, message: '请选择公告模板', trigger: 'change'}],
                title: [{required: true, message: '请输入公告标题', trigger: 'blur'}],
                content: [{required: true, message: '请输入公告内容', trigger: 'blur'}],
                btns: [{required: true, message: '请输入公告内容', trigger: 'change'}]
            }
        },
        data(){
            return{
                form:{
                    template:'',
                    title:'',
                    content:'',
                    btns:[]
                }
            }
        },
        methods:{

        }
    }
</script>
<style type="text/scss" lang="scss">

</style>