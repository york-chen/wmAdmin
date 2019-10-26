<template>
    <div class="images-wrap">
        <input v-show="false" :multiple="multiple" :accept="fileType.join(',')" @change="handleFileChange" ref="files" type="file">
        <slot></slot>
    </div>
</template>
<script>
import {$axUploadFile} from '@/_axios/api/common'
import { parse } from 'url';
export default {
    props:{
        multiple:{type:[String,Boolean],default:true},
        limit:{type:Number,default:3},
        fileType:{type: Array,default:()=>{return ['image/jpeg','image/png','image/bmp','image/gif','image/tif']}},
        fileSize:{type:Number,default: 2},
        _filelist:{type:Array,default:()=>{return []}}
    },
    methods:{
        triggerSelectFiles(index){
            this.index = index;
            this.$refs['files'].click()
        },
        handleFileChange(event){
            console.log(event)
            let files = event.target.files;
            let flag = this.validType(files) && this.validLength(files) && this.validSize(files);
            if(flag){
                for(let file of files){
                    let formData = new FormData();
                    formData.append('file',file);
                    this.uploadFileAction(formData);
                }
            }
        },
        uploadFileAction(formData){
            this.$emit('setLoading',{index:this.index,loading:true});
            $axUploadFile(formData,(progressEvent)=>{ //原生获取上传进度的事件
                console.log(progressEvent);
                if(progressEvent.lengthComputable){
                    let loaded = progressEvent.loaded,total = progressEvent.total;
                    this.$emit('process',{index:this.index,percentage:parseInt(loaded/total*100)})
                    //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                    //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                }
            }).then(()=>{
                this.$emit('setLoading',{index:this.index,loading:false});
            });
        },
        validLength(files){
            if(this.multiple && files.length > this.limit){
                this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件。`);
                return false
            }
            return true;
        },
        validSize(files){
            for(let file of files){
                let isLtSize = file.size / 1024 / 1024 < this.fileSize;
                if(!isLtSize){
                    this.$message.error(`上传图片大小不能超过 ${this.fileSize}MB!`);
                    return false
                }
            }
            return true;
        },
        validType(files){
            for(let file of files){
                let flag = this.fileType.indexOf(file.type) !== -1;
                if(!flag){
                    this.$message.error(`文件格式不正确!`);
                    return false
                }
            }
            return true;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>