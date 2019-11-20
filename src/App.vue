<template>
    <div class="app-container">
        <!--放Header 使用的是Mint_ui中的Header组件-->        <!--固定在顶部的头部-->
        <mt-header fixed title="Vue学习"></mt-header>
        <!--f放中间内容-->
        <transition>
                <router-view ></router-view>
        </transition>
       

        <!--放底部 这里使用的是MUI中的组件，需要在main.js中导入css样式-->
		<nav class="mui-bar mui-bar-tab">
                <router-link class="mui-tab-item " to="/home">
                    <span class="mui-icon mui-icon-home"></span>
                    <span class="mui-tab-label">首页</span>
                </router-link>

                <router-link class="mui-tab-item" to="/member">
                    <span class="mui-icon mui-icon-contact"></span>
                    <span class="mui-tab-label">会员</span>
                </router-link>

                <router-link class="mui-tab-item" to="/shopcar">
                    <span class="mui-icon  mui-icon-extra mui-icon-extra-cart"> <span class="mui-badge">0</span></span>
                    <span class="mui-tab-label">购物车</span>
                </router-link>

                <router-link class="mui-tab-item" to="/search">
                    <span class="mui-icon mui-icon-search"></span>
                    <span class="mui-tab-label">搜索</span>
                </router-link>
            </nav>
    </div>

</template>
        
<script>


</script>
        
<style lang="scss" scoped>
    .app-container{
        padding-top: 40px;
        overflow-x: hidden;/*解决头部和底部滑动的问题*/
        

    }
.v-enter {
    opacity: 0;
    transform: translateX(100%);
}
.v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
}
.v-enter-active, .v-leave-activate{
    transition: all 0.5s ease;
}
</style>