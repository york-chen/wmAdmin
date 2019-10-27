<template>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="form-wrap">
        <el-form-item label="广告选择" prop="styleType">
            <el-select :disabled="disabled" v-model="form.styleType" placeholder="请选择公告模板">
                <el-option v-for="item in battlepassAdTypeMap.get('all')" :key="item.value" :label="item.text" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-row v-if="form.styleType==='1'">
            <uploadImageBox :disabled="disabled" identity="1" v-model="form.imgs[0]" class="imgBox long"></uploadImageBox>
        </el-row>
        <el-form-item label="发布区组" required>
            <el-col :span="6">
                <el-form-item prop="publishAreaCode">
                    <el-select :disabled="disabled" v-model="form.publishAreaCode" placeholder="请选择发布区组">
                        <el-option v-for="(item,index) in areaList" :key="index" :label="item.areaName" :value="item.areaCode"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item prop="languageCode">
                    <el-select :disabled="disabled" v-model="form.languageCode" placeholder="请选择语言包">
                        <el-option v-for="(item,index) in languageList" :key="index" :label="item.langName" :value="item.langCode"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <color-text type="warning">提示：请注意图片或文字是否与选择服务器一致</color-text>
        </el-form-item>
    </el-form>
</template>
<script>
    import areaMixin from '@/mixins/area-group'
    import colorText from '@/components/color-text'
    import uploadImageBox from '@/components/uploadImageBox'
    import {battlepassAdTypeMap} from '@/utils/constents'
    export default {
        components:{colorText,uploadImageBox},
        mixins:[areaMixin],
        created(){
            this.rules = {
                styleType: [{required: true, message: '请选择广告样式', trigger: 'change'}],
                publishAreaCode: [{required: true, message: '请选择发布区组', trigger: 'change'}],
                languageCode: [{required: true, message: '请选择语言代号', trigger: 'change'}]
            };
            this.battlepassAdTypeMap = battlepassAdTypeMap;
        },
        data(){
            return{
                form:{
                    styleType:'',
                    publishAreaCode:'',
                    languageCode:'',
                    imgs:[
                        {imgCode:'',url:''}
                    ]
                }
            }
        },
        methods:{
            initFormData(data){
                this.form = {
                    ...this.form,
                    ...data
                };
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
                    _form.imgCodes = _form.imgs.map(item=>item.imgCode?item.imgCode:'{noop}').join(',');
                    delete _form.imgs;
                    return _form
                }
            }
        }
    }
</script>
<style type="text/scss" scoped lang="scss">
    .imgBox{
        height: 100px;
        width: 96%;
        margin-bottom: 5px;
        &.long{
            height: 200px;
        }
    }
</style>