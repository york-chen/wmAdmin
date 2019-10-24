<template>
    <el-form :model="form" :rules="rules" ref="form" class="form-wrap" label-width="85px">
        <el-form-item prop="content" label="预告内容">
            <el-input type="textarea" :rows="5" v-model="form.content" placeholder="请输入预告内容"></el-input>
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
    import uploadFile from '@/components/upload-file'
    import areaMixin from '@/mixins/area-group'
    import colorText from '@/components/color-text'
    export default {
        components:{uploadFile,colorText},
        mixins:[areaMixin],
        created(){
            this.rules = {
                content: [{required: true, message: '请输入公告内容', trigger: 'blur'}],
                publishAreaCode: [{required: true, message: '请选择发布区组', trigger: 'change'}],
                languageCode: [{required: true, message: '请选择语言代号', trigger: 'change'}],
                planPubStartTime: [{required: true, message: '请选择定时发布时间', trigger: 'change'}],
                pushTime: [{required: true, message: '请选择定时发布时间', trigger: 'change'}],
                planPubEndTime: [{required: true, message: '请选择定时关闭时间', trigger: 'change'}]
            }
        },
        data(){
            return{
                form:{
                    content: '',
                    planPubStartTime:'',
                    pushTime: '',
                    publishAreaCode:'',
                    languageCode:'',
                    planPubEndTime:''
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
                    let planPubStartTime = this.form.planPubStartTime;
                    let planPubEndTime = this.form.planPubEndTime;
                    this.form.planPubStartTime = this.$dayjs(planPubStartTime).format('YYYY-MM-DD HH:mm:ss')
                    this.form.planPubEndTime = this.$dayjs(planPubEndTime).format('YYYY-MM-DD HH:mm:ss')
                    return this.form;
                }
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