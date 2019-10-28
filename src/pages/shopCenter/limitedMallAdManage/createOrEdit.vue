<template>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="form-wrap">
        <el-form-item label="广告选择" prop="styleType">
            <el-select @change="styleTypeChange" :disabled="disabled" v-model="form.styleType" placeholder="请选择公告模板">
                <el-option v-for="item in limitedMallAdTypeMap.get('all')" :key="item.value" :label="item.text" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-row class="imgs-wrap" v-if="form.styleType==='1'">
            <el-col :span="6">
                <uploadImageBox :disabled="disabled" identity="1" v-model="form.imgs[0]" class="imgBox long"></uploadImageBox>
            </el-col>
            <el-col :span="18">
                <el-row>
                    <el-col :span="8">
                        <uploadImageBox :disabled="disabled" identity="2" v-model="form.imgs[1]" class="imgBox"></uploadImageBox>
                        </el-col>
                    <el-col :span="8">
                        <uploadImageBox :disabled="disabled" identity="4" v-model="form.imgs[3]" class="imgBox"></uploadImageBox>
                    </el-col>
                    <el-col :span="8">
                        <uploadImageBox :disabled="disabled" identity="6" v-model="form.imgs[5]" class="imgBox"></uploadImageBox>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <uploadImageBox :disabled="disabled" identity="3" v-model="form.imgs[2]" class="imgBox"></uploadImageBox>
                    </el-col>
                    <el-col :span="8">
                        <uploadImageBox :disabled="disabled" identity="5" v-model="form.imgs[4]" class="imgBox"></uploadImageBox>
                    </el-col>
                    <el-col :span="8">
                        <uploadImageBox :disabled="disabled" identity="7" v-model="form.imgs[6]" class="imgBox"></uploadImageBox>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row class="imgs-wrap" v-if="form.styleType==='2'">
            <el-col :span="6">
                <uploadImageBox :disabled="disabled" identity="1" v-model="form.imgs[0]" class="imgBox long"></uploadImageBox>
            </el-col>
            <el-col :span="6">
                <el-row>
                    <uploadImageBox :disabled="disabled" identity="2" v-model="form.imgs[1]" class="imgBox"></uploadImageBox>
                    </el-row>
                <el-row>
                    <uploadImageBox :disabled="disabled" identity="3" v-model="form.imgs[2]" class="imgBox"></uploadImageBox>
                </el-row>
            </el-col>
            <el-col :span="6">
                <uploadImageBox :disabled="disabled" identity="4" v-model="form.imgs[3]" class="imgBox long"></uploadImageBox>
            </el-col>
            <el-col :span="6">
                <el-row>
                    <uploadImageBox :disabled="disabled" identity="5" v-model="form.imgs[4]" class="imgBox"></uploadImageBox>
                    </el-row>
                <el-row>
                    <uploadImageBox :disabled="disabled" identity="6" v-model="form.imgs[5]" class="imgBox"></uploadImageBox>
                </el-row>
            </el-col>
        </el-row>
        <el-row class="imgs-wrap" v-if="form.styleType==='3'">
            <el-col :span="6">
                <uploadImageBox :disabled="disabled" identity="1" v-model="form.imgs[0]" class="imgBox long"></uploadImageBox>
            </el-col>
            <el-col :span="6">
                <uploadImageBox :disabled="disabled" identity="2" v-model="form.imgs[1]" class="imgBox long"></uploadImageBox>
            </el-col>
            <el-col :span=6>
                <el-row>
                    <uploadImageBox :disabled="disabled" identity="3" v-model="form.imgs[2]" class="imgBox"></uploadImageBox>
                </el-row>
                <el-row>
                    <uploadImageBox :disabled="disabled" identity="4" v-model="form.imgs[3]" class="imgBox"></uploadImageBox>
                </el-row>
            </el-col>
            <el-col :span=6>
                <el-row>
                    <uploadImageBox :disabled="disabled" identity="5" v-model="form.imgs[4]" class="imgBox"></uploadImageBox>
                </el-row>
                <el-row>
                    <uploadImageBox :disabled="disabled" identity="6" v-model="form.imgs[5]" class="imgBox"></uploadImageBox>
                </el-row>
            </el-col>
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
    import {limitedMallAdTypeMap} from '@/utils/constents'
    export default {
        components:{colorText,uploadImageBox},
        mixins:[areaMixin],
        created(){
            this.rules = {
                styleType: [{required: true, message: '请选择广告样式', trigger: 'change'}],
                publishAreaCode: [{required: true, message: '请选择发布区组', trigger: 'change'}],
                languageCode: [{required: true, message: '请选择语言代号', trigger: 'change'}]
            };
            this.limitedMallAdTypeMap = limitedMallAdTypeMap;
        },
        data(){
            return{
                form:{
                    styleType:'',
                    publishAreaCode:'',
                    languageCode:'',
                    imgs:[
                        {imgCode:'',url:''},
                        {imgCode:'',url:''},
                        {imgCode:'',url:''},
                        {imgCode:'',url:''},
                        {imgCode:'',url:''},
                        {imgCode:'',url:''},
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
                    _form.imgCodes = _form.imgs.map(item=>item.imgCode?item.imgCode:'').join(',');
                    delete _form.imgs;
                    return _form
                }
            },
            styleTypeChange(val){
                if(val ==='1'){
                    this.form.imgs = [
                        {imgCode:'',url:''},
                        {imgCode:'',url:''},
                        {imgCode:'',url:''},
                        {imgCode:'',url:''},
                        {imgCode:'',url:''},
                        {imgCode:'',url:''},
                        {imgCode:'',url:''}
                    ];
                }else if(val === '2' || val === '3'){
                    this.form.imgs = [
                        {imgCode:'',url:''},
                        {imgCode:'',url:''},
                        {imgCode:'',url:''},
                        {imgCode:'',url:''},
                        {imgCode:'',url:''},
                        {imgCode:'',url:''}
                    ];
                }
            }
        }
    }
</script>
<style type="text/scss" scoped lang="scss">
.imgs-wrap{
    margin-bottom: 15px;
    .imgBox{
        height: 177px;
        width: 218px;
        margin-bottom: 2px;
        &.long{
            height: 358px;
        }
    }
}
</style>