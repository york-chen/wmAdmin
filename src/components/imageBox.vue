<template>
    <div class="box-wrap" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <template v-if="imgData.url&&!imgData.loading">
            <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown" name="fade">
            <div @click="handleDelete" v-if="showMask" class="mask">
                <el-button @click.stop="doDelete">删除</el-button>
            </div>
        </transition>
        <img :src="imgData.url" alt="">
        </template>
        <template v-if="!imgData.url&&!imgData.loading">
            {{identity}}
        </template>
        <template v-if="imgData.loading">
            <div class="mask">
                <el-progress type="circle" :percentage="70" status="success"></el-progress>
            </div>
        </template>    
    </div>
</template>
<script>
// imgData:{
//                 url:'',
//                 _url:'',
//                 percentage:0,
//                 loading:false
//             }
export default {
    data(){
        return {
            showMask:false
        }
    },
    props:{
        identity:{type:String,default:'1'},
        imgData:{type:Object}
    },
    methods:{
        handleMouseEnter(){
            this.showMask = true;
        },
        handleMouseLeave(){
            this.showMask = false;
        },
        handleDelete(){
            alert(2)
        },
        doDelete(){
            alert(3)
        }
    }
}
</script>
<style lang="scss" scoped>
.box-wrap{
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    font-size: 16px;
    color: #ccc;
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
    background-color: rgba(0,0,0,.2)
}
</style>