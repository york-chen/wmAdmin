<template>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form-wrap">
        <el-form-item label="邮件标题" prop="title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="邮件内容" prop="content">
            <el-input type="textarea" :rows="5" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="添加附件" required="">
            <div v-for="(appendix,index) in form.prop" :key="index" class="appendix-wrap">
                <i @click="deleteAppendix(index)" class="el-icon-remove remove" v-if="form.prop.length>1"></i>
                <el-col :span="11">
                    <el-form-item class="sub-form-item" :prop="'prop.'+ index +'.Id'" :rules="appendixRules.Id">
                        <el-input placeholder="物品ID" v-model="appendix.Id"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="12">
                    <el-form-item class="sub-form-item" :prop="'prop.'+ index +'.Num'" :rules="appendixRules.Num">
                        <el-input placeholder="数量" v-model="appendix.Num"></el-input>
                    </el-form-item>
                </el-col>
            </div>
        </el-form-item>
        <el-form-item label="">
            <el-button @click="addNewAppendix" type="text">继续添加</el-button>
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
        <el-form-item label="定时发布" prop="planPubStartTime">
            <el-date-picker
                    v-model="form.planPubStartTime"
                    type="datetime"
                    placeholder="选择定时发布时间">
            </el-date-picker>
            {{_planPubStartTime}}
        </el-form-item>
        <el-form-item label="发布群体" prop="publishGroup">
            <el-select v-model="form.publishGroup" placeholder="请选择发布群体">
                <el-option v-for="item in publishGroupMap.get('all')" :key="item.value" :label="item.text" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item v-if="form.publishGroup==='PART'" label="上传用户ID" prop="userids">
            <upload-file :limit="1" v-model="form.userids"></upload-file>
        </el-form-item>
    </el-form>
</template>
<script>
    import areaMixin from '@/mixins/area-group'
    import colorText from '@/components/color-text'
    import uploadFile from '@/components/upload-file'
    import {publishGroupMap} from '@/utils/constents'
    export default {
        components:{colorText,uploadFile},
        mixins:[areaMixin],
        created(){
            this.rules = {
                title: [{required: true, message: '请输入邮件标题', trigger: 'blur'}],
                content: [{required: true, message: '请输入邮件内容', trigger: 'blur'}],
                publishAreaCode: [{required: true, message: '请选择发布区组', trigger: 'change'}],
                planPubStartTime: [{required: true, message: '请选择定时发布时间', trigger: 'change'}],
                languageCode: [{required: true, message: '请选择语言代号', trigger: 'change'}],
                publishGroup: [{required: true, message: '请选择发布群体', trigger: 'change'}],
                userids:[{required: true, message: '请上传用户id', trigger: 'change'}]
            };
            this.appendixRules = {
                Id: [
                    {required: true, message: '请输入物品ID', trigger: 'blur'}
                ],
                Num: [
                    {required: true, message: '请输入数量', trigger: 'blur'}
                ]
            };
            this.publishGroupMap = publishGroupMap;
        },
        data(){
            return{
                form:{
                    title:'',
                    content:'',
                    publishAreaCode:'',
                    languageCode:'',
                    planPubStartTime:'',
                    prop:[{Id:'',Num:'',Type:0}],
                    publishGroup:'',
                    userids:[]
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
                }else{
                    let _form = JSON.parse(JSON.stringify(this.form))
                    console.log(_form)
                    if(_form.publishGroup === 'ALL'){
                        _form.assginUserIds = 'ALL';
                    }else{
                        _form.assginUserIds = `PART:${_form.userids[0].imgCode}`;
                    }
                    delete _form.userids;
                    delete _form.publishGroup;
                    return _form
                }
            },
            deleteAppendix(index){
                this.form.prop.splice(index,1);
            },
            addNewAppendix(){
                this.form.prop.push({Id:'',Num:'',Type:0})
            }
        }
    }
</script>
<style type="text/scss" lang="scss">
.appendix-wrap{
    position: relative;
    .remove{
        color: red;
        font-size: 20px;
        position: absolute;
        top: -10px;
        left: -10px;
    }
    &:last-child .sub-form-item{
        margin-bottom: 0 !important;
    }
}
</style>