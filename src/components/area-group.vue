<template>
    <el-form v-model="form" :rules="rules" label-width="80px" ref="form" class="form-wrap">
        <el-form-item label="发布区组" required>
            <el-select placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="定时发布" required>
            <el-col :span="6">
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="1" class="t-c">&nbsp;</el-col>
            <el-col :span="6">
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="定时关闭" required>
            <el-col :span="6">
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="1" class="t-c">&nbsp;</el-col>
            <el-col :span="6">
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    created(){
        this.rules = {

        }
    },
    data(){
        return{
            form:{

            }
        }
    }
}
</script>
<style lang="scss" type="text/scss">

</style>