export default  {
    computed:{
        _publishTime(){
            let val = this.form.publishTime;
            if(!val){
                return ''
            }else {
                return `服务器对应的当地时间：${this.$dayjs(val).format('YYYY-MM-DD HH:mm a')}`
            }
        },
        _stopTime(){
            let val = this.form.stopTime;
            if(!val){
                return ''
            }else {
                return `服务器对应的当地时间：${this.$dayjs(val).format('YYYY-MM-DD HH:mm a')}`
            }
        }
    }
};