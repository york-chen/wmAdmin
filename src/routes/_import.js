import envType from '@/config/env'

let _import = null;

if(envType === 'development'){
    _import = file => require('@/pages/' + file + '.vue').default;
}else{
    _import = (file) => () => import(`@/pages/${file}.vue`)
}
export default _import;