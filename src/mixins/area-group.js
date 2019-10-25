export default  {
    props:{
        operateType:{type:String,default:'add'}
    },
    computed:{
        timeDiff(){
            let publishAreaCode = this.form.publishAreaCode;
            if(!publishAreaCode){
                return 0
            }else{
                let publishAreaCode = this.form.publishAreaCode,arr = this.$store.state.common.areaList.filter(item=>item.areaCode === publishAreaCode);
                return parseInt(arr[0].timeZone);
            }
        },
        _planPubStartTime(){
            let val = this.form.planPubStartTime;
            if(!val){
                return ''
            }else {
                let timeDiff = this.timeDiff,_day = this.$dayjs(val);
                if(timeDiff>0){
                    _day = _day.add(timeDiff,'hour');
                }else{
                    _day = _day.subtract(Math.abs(timeDiff),'hour'); 
                }
                return `服务器对应的当地时间：${_day.format('YYYY-MM-DD HH:mm a')}`
            }
        },
        _planPubEndTime(){
            let val = this.form.planPubEndTime;
            if(!val){
                return ''
            }else {
                let timeDiff = this.timeDiff,_day = this.$dayjs(val);
                if(timeDiff>0){
                    _day = _day.add(timeDiff,'hour');
                }else{
                    _day = _day.subtract(Math.abs(timeDiff),'hour'); 
                }
                return `服务器对应的当地时间：${_day.format('YYYY-MM-DD HH:mm a')}`
            }
        },
        areaList(){
            return this.$store.state.common.areaList
        },
        languageList(){
            return this.$store.state.common.languageList
        },
        disabled(){
            let operateType = this.operateType;
            if(operateType === 'view'){
                return true
            }else{
                return false
            }
        }
    }
};