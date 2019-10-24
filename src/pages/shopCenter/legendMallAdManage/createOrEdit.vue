<template>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="form-wrap">
        <el-form-item label="广告选择" prop="styleType">
            <el-select v-model="form.styleType" placeholder="请选择公告模板">
                <el-option v-for="item in limitedMallAdTypeMap.get('all')" :key="item.value" :label="item.text" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="图片上传" prop="filelist">
            <upload-file :limit="10" v-model="form.filelist"></upload-file>
        </el-form-item>
        <el-form-item v-if="form.filelist.length" label="图片预览">
            <div class="preview-wrap">
                <template v-for="item in form.filelist">
                    <img class="preview" :src="item.url" :key="item.id" alt="">
                </template>
            </div>
        </el-form-item>
        <el-form-item label="发布区组" required>
            <el-col :span="6">
                <el-form-item prop="publishAreaCode">
                    <el-select v-model="form.publishAreaCode" placeholder="请选择发布区组">
                        <el-option v-for="(item,index) in areaList" :key="index" :label="item.areaName" :value="item.areaCode"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item prop="languageCode">
                    <el-select v-model="form.languageCode" placeholder="请选择语言包">
                        <el-option v-for="(item,index) in languageList" :key="index" :label="item.langName" :value="item.langCode"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <color-text type="warning">提示：请注意图片或文字是否与选择服务器一致</color-text>
        </el-form-item>
    </el-form>
</template>
<script>
    import uploadFile from '@/components/upload-img'
    import areaMixin from '@/mixins/area-group'
    import colorText from '@/components/color-text'
    import {limitedMallAdTypeMap} from '@/utils/constents'
    export default {
        components:{uploadFile,colorText},
        mixins:[areaMixin],
        created(){
            this.rules = {
                styleType: [{required: true, message: '请选择广告样式', trigger: 'change'}],
                publishAreaCode: [{required: true, message: '请选择发布区组', trigger: 'change'}],
                languageCode: [{required: true, message: '请选择语言代号', trigger: 'change'}],
                filelist: [{required: true, message: '请上传图片', trigger: 'change'}],
            };
            this.limitedMallAdTypeMap = limitedMallAdTypeMap;
        },
        data(){
            return{
                form:{
                    styleType:'',
                    publishAreaCode:'',
                    languageCode:'',
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
                if(!flag){
                    return flag
                }else{
                    let _form = JSON.parse(JSON.stringify(this.form));
                    _form.imgCodes = _form.filelist.map(item=>item.imgCode);
                    delete _form.filelist;
                    return _form
                }
            }
        }
    }
</script>
<style type="text/scss" lang="scss">
    .preview-wrap{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .preview{
            width: 25%;
            margin-right: 5%;
        }
    }
</style>