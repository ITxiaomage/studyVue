import Vue from 'vue'
//导入路由

import VueRoter from 'vue-router'
Vue.use(VueRoter)
import router from  './router.js'

import app from './App.vue'

//导入Mint
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

//d导入Mui 的样式
import '../lib/mui/css/mui.min.css'

//找到这个icons-extra.css拷贝到css文件夹中，然后还要把字体拷过来
import '../lib/mui/css/icons-extra.css'


//导入vue-resource并且安装
import VueResource from 'vue-resource'
Vue.use(VueResource)


var vm = new Vue({
    el:"#app",
    render:c => c(app),
    router
})