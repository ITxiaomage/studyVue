<template>
    <div>

        <!--轮播图，来自于Mint-Ui的Swipe-->
        <mt-swipe :auto="4000">
            <!--在组建使用v-for必须绑定-->
                <mt-swipe-item v-for=" item in lunbotuList" :key='item.id'>
                    <img :src ='item.img' alt='图片'>
                </mt-swipe-item>

        </mt-swipe>

        <!--九宫格 到六宫格的改造-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 "><a href="#">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻资讯</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 "><a href="#">
                        <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
                        <div class="mui-media-body">图片分享</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 "><a href="#">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">商品购买</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="#">
                        <span class="mui-icon mui-icon-location"></span>
                        <div class="mui-media-body">浏览反馈</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 "><a href="#">
                        <span class="mui-icon mui-icon-search"></span>
                        <div class="mui-media-body">视频专区</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 "><a href="#">
                        <span class="mui-icon mui-icon-phone"></span>
                        <div class="mui-media-body">联系我们</div></a></li>
            </ul> 
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                lunbotuList:[]//保存轮播图的数组
            }
        },
        created(){
            this.getLunbotu()
        },
        methods:{
            getLunbotu(){
                this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(result=>{
                    if (result.body.status == 0){
                        this.lunbotuList = result.body.message;
                    }else{
                        Toast('轮播图加载失败')
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    /*设计轮播图的高度*/
    .mint-swipe{
        height: 200px;
    }

    /*轮播图的每个类是mint-swipe-item，这样就给所有的轮播图设置了同一的颜色*/
    /* .mint-swipe-item{
        background-color: red;
    } */

    
    /*轮播图的每个类是mint-swipe-item，为了给每个轮播图设置不一样的颜色，需要在类上加入方法nth-child,方法中的参数代表第几张轮播图*/
    /* .mint-swipe-item:nth-child(1){
        background-color: red;
    }
    .mint-swipe-item:nth-child(2){
        background-color :black;
    }
    .mint-swipe-item:nth-child(3){
        background-color:pink;
    } */

    /*利用sass语法，简写为*/
    .mint-swipe-item {
        &:nth-child(1){
            background-color:pink;
        }
        &:nth-child(2){
            background-color:red;
        }
        
        &:nth-child(3){
            background-color:black;
        }
        img {
            height: 100%;
            width: 100%;
        }
        
        
    }

.mui-table-view mui-grid-view mui-grid-9{
    background-color: #fff;
    border:none;
}
.mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3{
    border:0;
}
.mui-media-body{
    font-size: 13px;
}
</style>