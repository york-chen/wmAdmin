<template>
    <el-form :model="form" :rules="rules" ref="form" class="form-wrap" label-width="85px">
        <el-form-item prop="content" label-width="0">
            <div class="strong">停机维护预告内容</div>
            <el-input type="textarea" :rows="5" v-model="form.content" placeholder="请输入预告内容"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
            <div class="strong">停机维护提示倒计时</div>
            <el-form-item label="倒计时启用" label-width="85px">
                <el-radio-group v-model="form.status">
                    <el-radio label="1">启用</el-radio>
                    <el-radio label="0">停用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="定时发布" prop="publishTime" label-width="80px" v-if="form.status==1">
                <el-date-picker
                        v-model="form.publishTime"
                        type="datetime"
                        placeholder="选择定时发布时间">
                </el-date-picker>
                {{_publishTime}}
            </el-form-item>
        </el-form-item>
        <el-form-item label="发布区组" prop="area">
            <el-select v-model="form.area" placeholder="请选择发布区组">
                <el-option label="上海" value="shanghai"></el-option>
                <el-option label="北京" value="beijing"></el-option>
            </el-select>
            <color-text type="warning">提示：请注意图片或文字是否与选择服务器一致</color-text>
        </el-form-item>
        <el-form-item label="定时发布" prop="pushTime">
            <el-date-picker
                    v-model="form.pushTime"
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
    import uploadFile from '@/components/upload-file'
    import areaMixin from '@/mixins/area-group'
    import colorText from '@/components/color-text'
    export default {
        components:{uploadFile,colorText},
        mixins:[areaMixin],
        created(){
            this.rules = {
                content: [{required: true, message: '请输入公告内容', trigger: 'blur'}],
                area: [{required: true, message: '请选择发布区组', trigger: 'change'}],
                publishTime: [{required: true, message: '请选择定时发布时间', trigger: 'change'}],
                pushTime: [{required: true, message: '请选择定时发布时间', trigger: 'change'}],
                stopTime: [{required: true, message: '请选择定时关闭时间', trigger: 'change'}]
            }
        },
        data(){
            return{
                form:{
                    content: '',
                    status: '1',
                    publishTime:'',
                    pushTime: '',
                    area:'',
                    stopTime:''
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
    .form-wrap{
        .strong{
            font-weight: bold;
        }
    }
</style>