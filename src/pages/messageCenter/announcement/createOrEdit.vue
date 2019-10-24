<template>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="form-wrap">
        <el-form-item label="公告模板" required>
            <el-col :span="6">
                <el-form-item prop="eventType">
                    <el-select v-model="form.eventType" placeholder="请选择公告模板">
                        <el-option v-for="item in templateTypeMap.get('all')" :key="item.value" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <template v-if="form.eventType==='NOTICE_IMG'">
                <el-col class="line" :span="1">&nbsp;</el-col>
                <el-col :span="6">
                    <el-form-item prop="styleType">
                        <el-select v-model="form.styleType" placeholder="请选择图片模板">
                            <el-option v-for="item in templateMap.get('all')" :key="item.value" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </template>
        </el-form-item>
        <template v-if="form.eventType ==='NOTICE_WORD'">
            <el-form-item label="公告标题" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="公告内容" prop="content">
                <el-input type="textarea" :rows="5" v-model="form.content"></el-input>
            </el-form-item>
        </template>
        <template v-if="form.eventType==='NOTICE_IMG'">
            <el-form-item label="图片上传" prop="filelist">
                <upload-file :limit="3" v-model="form.filelist"></upload-file>
            </el-form-item>
            <el-form-item v-if="form.filelist.length" label="图片预览">
                <div class="preview-wrap">
                    <template v-for="item in form.filelist">
                        <img class="preview" :src="item._url||item.url" :key="item.imgCode" alt="">
                    </template>
                </div>
            </el-form-item>
            <el-form-item v-if="form.filelist.length" label="显示按钮" prop="blank">
                <el-col v-for="(item,index) in form.btns" :key="item.imgCode" :span="8">
                    <el-form-item :prop="'btns.'+ index +'.btn'" :rules="btnRule.btn">
                        <el-select v-model="item.btn" placeholder="请选择显示按钮">
                            <el-option v-for="item in btnMap.get('all')" :key="item.value" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
        </template>
        <el-form-item label="发布区组">
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
        <el-form-item label="定时发布" prop="planPubStartTime">
            <el-date-picker
                    v-model="form.planPubStartTime"
                    type="datetime"
                    placeholder="选择定时发布时间">
            </el-date-picker>
            {{_planPubStartTime}}
        </el-form-item>
        <el-form-item label="定时关闭" prop="planPubEndTime">
            <el-date-picker
                    v-model="form.planPubEndTime"
                    type="datetime"
                    placeholder="选择定时关闭时间">
            </el-date-picker>
            {{_planPubEndTime}}
        </el-form-item>
    </el-form>
</template>
<script>
    import uploadFile from '@/components/upload-img'
    import areaMixin from '@/mixins/area-group'
    import colorText from '@/components/color-text'
    import {templateMap,templateTypeMap,btnMap} from '@/utils/constents'
    export default {
        components:{uploadFile,colorText},
        mixins:[areaMixin],
        created(){
            this.rules = {
                styleType: [{required: true, message: '请选择图片模板', trigger: 'change'}],
                eventType: [{required: true, message: '请选择公告模板', trigger: 'change'}],
                title: [{required: true, message: '请输入公告标题', trigger: 'blur'}],
                content: [{required: true, message: '请输入公告内容', trigger: 'blur'}],
                publishAreaCode: [{required: true, message: '请选择发布区组', trigger: 'change'}],
                languageCode: [{required: true, message: '请选择语言包', trigger: 'change'}],
                planPubStartTime: [{required: true, message: '请选择定时发布时间', trigger: 'change'}],
                planPubEndTime: [{required: true, message: '请选择定时关闭时间', trigger: 'change'}],
                filelist: [{required: true, message: '请上传图片', trigger: 'change'}],
                blank: [{required: true, message: '请输入公告标题', trigger: 'blur'}]
            };
            this.btnRule = {
              btn:[{required: true, message: '请选择显示按钮', trigger: 'change'}]
            };
            this.templateMap = templateMap;
            this.templateTypeMap = templateTypeMap;
            this.btnMap = btnMap;
        },
        data(){
            return{
                form:{
                    eventType:'NOTICE_WORD',
                    styleType:'',
                    title:'',
                    content:'',
                    btns:[],
                    publishAreaCode:'',
                    languageCode:'',
                    planPubStartTime:'',
                    planPubEndTime:'',
                    filelist:[],
                    blank:'blank'//该字段没有作用，只是为了避免校验不过
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
                if(!flag){
                    return flag;
                }else {
                    let data,form = this.form;
                    form.planPubStartTime = this.$dayjs(form.planPubStartTime).format('YYYY-MM-DD HH:mm:ss');
                    form.planPubEndTime = this.$dayjs(form.planPubEndTime).format('YYYY-MM-DD HH:mm:ss');
                    if(form.eventType === 'NOTICE_WORD'){
                        data = {
                            id:form.id,
                            businessId:form.businessId,
                            "eventType":form.eventType,
                            "title":form.title,
                            "content":form.content,
                            "publishAreaCode":form.publishAreaCode,
                            "languageCode":form.languageCode,
                            "planPubStartTime": form.planPubStartTime,
                            "planPubEndTime": form.planPubEndTime
                        }
                    }else{
                        data = {
                            id:form.id,
                            businessId:form.businessId,
                            "eventType":form.eventType,
                            "styleType":form.styleType,
                            "publishAreaCode":form.publishAreaCode,
                            "languageCode":form.languageCode,
                            "planPubStartTime": form.planPubStartTime,
                            "planPubEndTime": form.planPubEndTime,
                            "imgCodes":form.btns.map(item=>item.imgCode).join(','),
                            "showButton":form.btns.map(item=>item.btn).join(','),
                        }
                    }
                    return data;
                }
            }
        },
        watch:{
            'form.filelist'(){//为了解决按钮下拉框不 实时更新的 将就写法  以后再优化
                let btns = this.form.btns,fileList = this.form.filelist,tempObj = {},arr = [];
                btns.forEach(item=>{
                    tempObj[item.imgCode] = item.btn;
                });
                arr = fileList.map(item=>({...item,btn:tempObj[item.imgCode]?tempObj[item.imgCode]:''}));
                this.form.btns = arr;
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