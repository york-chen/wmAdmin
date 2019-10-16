<template>
    <el-button :disabled="disabled" :plain="plain" :size="size" :round="round" :style="_style" :type="type" @click="handleClick">
        {{_label}}
    </el-button>
</template>

<script>
    export default {
        name: "asyncButton",
        data() {
            return {
                loading: false
            }
        },
        props: {
            size: String,
            label: {
                type: String,
                default: '确定'
            },
            exec_label: {
                type: String,
                default: '加载中'
            },
            type: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            _style: {
                type: String,
                default: ''
            },
            arguments: {
                default: null
            },
            plain: {
                default: false
            },
            round:{
                default: false
            }
        },
        computed: {
            _label() {
                return this.loading ? this.exec_label : this.label
            }
        },
        methods: {
            handleClick() {
                if (this.loading) return;
                this.$emit('_click', this.changeLoading, this.arguments)
            },
            changeLoading(fn) {
                if (!fn || !fn.then) {
                    return;
                }
                this.loading = true;
                fn.then(() => {
                    this.loading = false;
                }).catch(() => {
                    this.loading = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>