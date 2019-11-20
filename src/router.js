


import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
//路由对象

//d导入路由组件

import HomeContainer from '../components/tabbar/HomeContainer.vue'
import MemberContainer from '../components/tabbar/MemberContainer.vue'
import SearchContainer from '../components/tabbar/SearchContainer.vue'
import ShopcarContainer from '../components/tabbar/ShopcarContainer.vue'


var  router = new VueRouter({
    routes:[
        {path:'/', redirect:'/home'}
        {path: '/home', component: HomeContainer},
        {path: '/member', component: MemberContainer},
        {path: '/shopcar', component: SearchContainer},
        {path: '/search', component: ShopcarContainer}


    ],
    linkActiveClass:"mui-active" //覆盖默认的路由高亮类，默认的类叫做link-active
})

//把路由暴露出去
export default router