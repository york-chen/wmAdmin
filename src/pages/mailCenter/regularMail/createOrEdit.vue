<template>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form-wrap">
        <el-form-item label="邮件标题" prop="versionNum">
            <el-input v-model="form.versionNum"></el-input>
        </el-form-item>
        <el-form-item label="邮件内容" prop="content">
            <el-input type="textarea" :rows="5" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="添加附件">
            <div v-for="(appendix,index) in form.appendixList" :key="index" class="appendix-wrap">
                <i @click="deleteAppendix(index)" class="el-icon-remove remove" v-if="form.appendixList.length>1"></i>
                <el-col :span="11">
                    <el-form-item class="sub-form-item" :prop="'appendixList.'+ index +'.id'" :rules="appendixRules.id">
                        <el-input placeholder="物品ID" v-model="appendix.id"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="12">
                    <el-form-item class="sub-form-item" :prop="'appendixList.'+ index +'.number'" :rules="appendixRules.number">
                        <el-input placeholder="数量" v-model="appendix.number"></el-input>
                    </el-form-item>
                </el-col>
            </div>
        </el-form-item>
        <el-form-item label="">
            <el-button @click="addNewAppendix" type="text">继续添加</el-button>
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
        <el-form-item label="发布群体" prop="publishGroup">
            <el-select v-model="form.publishGroup" placeholder="请选择发布群体">
                <el-option label="全服" value="all"></el-option>
                <el-option label="指定用户" value="designUser"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="上传用户id" prop="userids">
            <upload-file v-model="form.userids"></upload-file>
        </el-form-item>
    </el-form>
</template>
<script>
    import areaMixin from '@/mixins/area-group'
    import colorText from '@/components/color-text'
    import uploadFile from '@/components/upload-file'
    export default {
        components:{colorText,uploadFile},
        mixins:[areaMixin],
        created(){
            this.rules = {
                versionNum: [{required: true, message: '请选择图片模板', trigger: 'change'}],
                content: [{required: true, message: '请选择公告模板', trigger: 'change'}],
                area: [{required: true, message: '请选择发布区组', trigger: 'change'}],
                publishTime: [{required: true, message: '请选择定时发布时间', trigger: 'change'}],
                publishGroup: [{required: true, message: '请选择发布群体', trigger: 'change'}],
                userids:[{required: true, message: '请上传用户id', trigger: 'change'}]
            };
            this.appendixRules = {
                id: [
                    {required: true, message: '请输入物品ID', trigger: 'blur'}
                ],
                number: [
                    {required: true, message: '请输入数量', trigger: 'blur'}
                ]
            }
        },
        data(){
            return{
                form:{
                    versionNum:'',
                    content:'',
                    area:'',
                    publishTime:'',
                    appendixList:[{id:'',number:''}],
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
                return flag?this.form:flag;
            },
            deleteAppendix(){},
            addNewAppendix(){
                this.form.appendixList.push({id:'',number:''})
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