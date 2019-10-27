<template>
    <div>
        <el-upload
                action="/api/upload"
                list-type="picture-card"
                multiple
                :limit="limit"
                :file-list="filelist"
                :on-success="uploadSuc"
                :on-remove="removeFile"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeUpload"
                :on-exceed="exceedCallback">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog  append-to-body :visible.sync="dialogVisible">
            <div class="t-c">
                <img width="100%" :src="dialogImageUrl" alt="">
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {$axUploadImg} from '@/_axios/api/common'
export default {
    model:{
        prop:'_filelist',
        event:'change'
    },
    data(){
        return{
            dialogImageUrl: '',
            dialogVisible: false,
            filelist:this._filelist
        }
    },
    props:{
        limit:{type:Number,default:3},
        fileType:{type: Array,default:()=>{return ['image/jpeg','image/png','image/bmp','image/gif','image/tif']}},
        fileSize:{type:Number,default: 2},
        _filelist:{type:Array,default:()=>{return []}}
    },
    methods:{
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        beforeUpload(file) {
            const valid = this.fileType.indexOf(file.type) !== -1;
            const isLt2M = file.size / 1024 / 1024 < this.fileSize;
            if (!valid) {
                this.$message.error('文件格式不正确!');
                return false
            }
            if (!isLt2M) {
                this.$message.error(`上传图片大小不能超过 ${this.fileSize}MB!`);
                return false
            }
        },
        exceedCallback(files){
            this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件。`);
        },
        uploadSuc(response,file,filelist){
            let data = response.data;
            filelist.forEach(item=>{
                if(item.uid === file.uid){
                    item.imgCode = data.imgCode;
                    item._url = data.url;
                }
            });
            this.$emit('change',filelist.map(item=>({imgCode:item.imgCode,url:item._url,_url:item.url})));
        },
        removeFile(file,filelist){
            this.$emit('change',filelist.map(item=>({imgCode:item.imgCode,url:item._url,_url:item.url})));
        }
    }
}
</script>
<style type="text/scss" lang="scss"></style>