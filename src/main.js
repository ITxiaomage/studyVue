import Vue from 'vue'

import app from './App.vue'

//按需导入头部组件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

//d导入Mui 的样式
import '../lib/mui/css/mui.min.css'


var vm = new Vue({
    el:"#app",
    render:c => c(app)
})