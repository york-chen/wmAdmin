<template>
    <div class="wrap">
        <input v-show="false" accept="image/*" @change="handleFileChange" ref="files" type="file">
        <template v-if="url&&!loading">
            <div class="box-wrap" @mouseleave="handleMouseLeave">
                <transition name="el-fade-in">
                    <div v-if="showMask" class="mask">
                        <i class="el-icon-delete delete finger" @click.stop="doDelete"></i>
                    </div>
                </transition>
                <img @mouseenter="handleMouseEnter" class="img" :src="url" alt="">
            </div>
        </template>
        <template v-if="!url&&!loading">
            <div @click="triggerFileSelect" class="box-wrap finger" :class="disabled?'disabled':''">
                {{identity}}
            </div>
        </template>
        <template v-if="loading">
            <div class="box-wrap">
                 <div class="mask">
                <el-progress type="circle" :percentage="percentage" status="success"></el-progress>
            </div>
            </div>
        </template>
    </div>
</template>
<script>
import {$axUploadFile} from '@/_axios/api/common'
import { parse } from 'url';
import { log } from 'util';
export default {
    model:{
        prop:'imgData',
        event:'change'
    },
    props:{
        imgData:{type:Object,default:()=>{return {}}},
        fileSize:{type:Number,default: 2},
        identity:{type:String,default:'1'},
        disabled:{type:[String,Boolean],default:false}
    },
    data(){
        return {
            showMask:false,
            url:this.imgData.url,
            imngCode:this.imgData.imgCode,
            percentage:10,
            loading:false
        }
    },
    methods:{
        triggerFileSelect(){
            if(this.disabled)return
            this.$refs['files'].click();
        },
        handleFileChange(event){
            let files = event.target.files;
            let flag = this.validType(files) && this.validSize(files);
            if(flag){
                for(let file of files){
                    let formData = new FormData();
                    formData.append('file',file);
                    this.uploadFileAction(formData);
                }
            }
        },
        uploadFileAction(formData){
            this.loading = true;
            this.percentage = 10;
            $axUploadFile(formData,(progressEvent)=>{ //原生获取上传进度的事件
                if(progressEvent.lengthComputable){
                    let loaded = progressEvent.loaded,total = progressEvent.total;
                    this.percentage = parseInt(loaded/total*100)
                }
            }).then((res)=>{
                this.url = res.url;
                this.imgCode = res.imgCode;
                this.loading = false;
                this.percentage = 100;
                this.$refs['files'].value = '';
                this.imgData.url = this.url;
                this.imgData.imgCode = this.imgCode;
                this.$emit('change',this.imgData);
            }).catch(()=>{
                this.url = '';
                this.loading = false;
                this.percentage = 10;
                this.imgCode = '';
                this.$refs['files'].value = '';
                this.imgData.url = this.url;
                this.imgData.imgCode = this.imgCode;
                this.$emit('change',this.imgData);
            });
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
                let flag = file.type.indexOf('image') !== -1;
                if(!flag){
                    this.$message.error(`文件格式不正确!`);
                    return false
                }
            }
            return true;
        },
        handleMouseEnter(){
            if(this.disabled)return;
            this.showMask = true;
        },
        handleMouseLeave(){
            if(this.disabled)return;
            this.showMask = false;
        },
        doDelete(){
            this.url = '';
            this.imgCode = '';
            this.percentage = 10;
            this.$emit('change',{...this.imgData,url:this.url,imgCode:this.imgCode});
        }
    }
}
</script>
<style lang="scss" scoped>
.wrap{
    font-size: 16px;
    color: #ccc;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border: 1px solid #EBEEF5;
}
.box-wrap{
    height: 100%;;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}
.mask{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top :0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5)
}
.img{
    width: 100%;
    height: 100%;
}
.delete{
    font-size: 25px;
}
.finger{
    cursor: pointer;
}
.disabled{
    cursor: not-allowed;
}
</style>