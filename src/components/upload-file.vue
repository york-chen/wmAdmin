<template>
    <div>
        <el-upload
                ref="upload"
                action="/api/upload"
                :limit="limit"
                :file-list="filelist"
                :on-success="uploadSuc"
                :on-remove="removeFile"
                :before-upload="beforeUpload"
                :on-exceed="exceedCallback">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
    </div>
</template>
<script>
    export default {
        model:{
            prop:'_filelist',
            event:'change'
        },
        data(){
            return{
                filelist:this._filelist
            }
        },
        props:{
            limit:{type:Number,default:1},
            fileType:{type: Array,default:()=>{return ['text/plain']}},
            fileSize:{type:Number,default: 2},
            _filelist:{type:Array,default:()=>{return []}}
        },
        methods:{
            beforeUpload(file) {
                const valid = this.fileType.indexOf(file.type) !== -1;
                const isLt2M = file.size / 1024 / 1024 < this.fileSize;
                if (!valid) {
                    this.$message.error('文件格式不正确!');
                }
                if (!isLt2M) {
                    this.$message.error(`上传文件大小不能超过 ${this.fileSize}MB!`);
                }
                return valid && isLt2M;
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