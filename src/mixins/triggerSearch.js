let btnStatus = {
    _showSave:false,//保存
    _showApproval:false,//提交审核
    _showPublish:false,//发布
    _showCancel:false,//撤回
    _showRepublish:false,//重新发布
    _showDelay:false//推迟发布
};
export default {
    data(){
        return{
            btnStatus:{...btnStatus}
        }
    },
    methods:{
        queryStatusChange(){
            this.queryList()
        },
        formatStatusType(status){
            let type = 'primary';
            switch (status) {
                case 'WAIT_AUDIT':type = "primary";break;
                case 'WAIT_PUSH':type = "success";break;
                case 'REJECT':type = "danger";break;
            }
        },
        getAreaLanguageData(){
            return Promise.all([this.$store.dispatch('common/sendGetAreas'),this.$store.dispatch('common/sendGetLanguages')])
        },
        indexMethod(index) {
            return index +1;
        },
        submitApproval(promise){
            promise(this.$store.dispatch('common/sendSubmitApproval',{businessId:this.viewData.businessId}).then(()=>{
                this.$message.success('操作成功！');
                this.closeDialog();
                this.queryList();
            }))
        },
        publishAction(promise){
            promise(this.$store.dispatch('common/sendPublishl',{businessId:this.viewData.businessId}).then(()=>{
                this.$message.success('操作成功！');
                this.closeDialog();
                this.queryList();
            }))
        },
        cancelAction(promise){
            promise(this.$store.dispatch('common/sendCancel',{businessId:this.viewData.businessId}).then(()=>{
                this.$message.success('操作成功！');
                this.closeDialog();
                this.queryList();
            }))
        },
        republishAction(promise){
            promise(this.$store.dispatch('common/sendRepublish',{businessId:this.viewData.businessId}).then(()=>{
                this.$message.success('操作成功！');
                this.closeDialog();
                this.queryList();
            }))
        },
        delayAction(promise){
            promise(this.$store.dispatch('common/sendDelay',{businessId:this.viewData.businessId}).then(()=>{
                this.$message.success('操作成功！');
                this.closeDialog();
                this.queryList();
            }))
        }
    },
    watch:{
        showDialog(val){
            if(!val){
                this.btnStatus = {...btnStatus};
            }else{
                if(this.operateType === 'add'||this.operateType === 'edit'){
                    this.btnStatus._showSave = true;
                }else{//查看的时候
                    let status = this.viewData.status;
                    if(status === 'DRAFT'){
                        this.btnStatus._showApproval = true;
                    }
                    if(status === 'REJECT'){
                        this.btnStatus._showApproval = true;
                    }
                    if(status === 'WAIT_PUSH'){
                        this.btnStatus._showPublish = true;
                    }
                    if(status === 'PUSHING'){
                        this.btnStatus._showCancel = true;
                    }
                    if(status === 'PUSH_FAIL'){
                        this.btnStatus._showRepublish = true;
                        this.btnStatus._showDelay = true;
                    }
                }

            }
        }
    }
}