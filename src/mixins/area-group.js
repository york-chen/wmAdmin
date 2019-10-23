export default  {
    computed:{
        _planPubStartTime(){
            let val = this.form.planPubStartTime;
            if(!val){
                return ''
            }else {
                return `服务器对应的当地时间：${this.$dayjs(val).format('YYYY-MM-DD HH:mm a')}`
            }
        },
        _planPubEndTime(){
            let val = this.form.planPubEndTime;
            if(!val){
                return ''
            }else {
                return `服务器对应的当地时间：${this.$dayjs(val).format('YYYY-MM-DD HH:mm a')}`
            }
        },
        areaList(){
            return this.$store.state.common.areaList
        },
        languageList(){
            return this.$store.state.common.languageList
        }
    }
};