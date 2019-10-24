export default {
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
        }
    }
}