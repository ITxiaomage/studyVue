# webpack学习

## nrm 的使用

- 安装： npm install nrm -g
- nrm ls 查看nrm的镜像地址
- nrm use taobao 表示使用淘宝镜像

## npm -S -D -g区别

- npm i module_name  -S  = >  npm install module_name --save    写入到 dependencies 对象

- npm i module_name  -D  => npm install module_name --save-dev   写入到 devDependencies 对象

- npm i module_name  -g  全局安装

## 常见静态资源

- JS
  - .js .ts .coffee
- css
  - .scss .css  sass官网, less
- Image
  - .jgp .png .gif .svg
- 字体
  - .svg .ect .woff .ttf
- 模板文件
  - .jade .vue(这是在webpack中定义组价的方式)

### 静态资源太多

- 网页加载速度慢
- 处理错综复杂的依赖关系

### 解决方案

- 合并、压缩、精灵图、小图片Base64编码
- 使用webpack，解决复杂的依赖关系

## 安装jquery

- npm init -y
- npm i jquery -S

## webpack

- 前端的构建工具、基于Node.js开发
- 安装 npm install  webpack -g
- 处理js之间的相互依赖关系
- 转化高级的浏览器语法到低级的语法

## 浏览器不识别es6语法

- 采用webpack将其打包处理为浏览器可以识别的，然后重新引入打包后的文件
- webpack  .\src\main.js -o   .\dist\bundle.js 前边是打包的文件路径，后边是打包好的文件存放路径

## 实现webpack的自动打包

- 使用webpack-dev-server实现自动打包
- npm install webpack-dev-server -D 把工具安装到项目
- 安装完毕后，这个工具的用法和webpack的用法完全一致
- 由于在项目中安装的，所以无法当做脚本命令，在cmd中直接运行
- 在package.json的script节点增加这个命令的本地访问，后边加的--open 就是自动打开,--port 3000就是指定打开的端口,--contentBase src就是指定显示的目录 --hot每次只重新编译和加载被更新的，然后会自动加载渲染

  ~~~json
    "scripts": {
        "dev": "webpack-dev-server --open --port 3000  --contentBase src --hot"
  },
  ~~~

  - webpack-dev-server生成的bundle.js并没有在物品在磁盘，被放到了磁盘中，需要从跟目录引入，所以看不到，需要将index.html中的引入换为根目录引用

  ~~~html
    <!--用webpack-dev-server之后自动打包的bundl.js-->
    <script src="/bundle.js"></script>
  ~~~

- 然后就可以运行npm run dev命令运行了,然后就会一直持续监听代码的改变了
- 第二种配置方式，比较麻烦,在webpack.config.js中增加新的节点

  - //这是配置webpack-dev-server命令的第二种参数，相对来说，这种方式麻烦一点,不推荐

    ~~~json
        module.exports={
            decvServer:{
                open:true, //自动打开
                port:3000, //端口
                contentBase:'src', //显示的目录
                hot:true //启用热更新
        }

    ~~~

  - 然后在webpack.config.js中导入这个

   ~~~js
    const webpack = require('webpack')
    ~~~

  - 最后在webpack.config.js配置插件节点

    ~~~js
        plugins:[ //这是第三步
        //然后new一个热更新的模块对象，这是启用热更新的第三部
            new webpack.HotModuleReplacementPlugin()
        ]
    ~~~

## CSS的文件加载

- webpack只能处理js文件，不能处理非JS类型的文件
- 如果要处理非JS文件，要安装loader加载器
- 因此处理css需要安装 npm install style-loader css-loader -D
- 打开webpack.config.js新增配置节点，叫做module,它是一个对象，这个对象有个rules属性，它是数组，这个数组存放所有第三方文件的匹配和处理规则

### .css文件处理

- 先在main.js导入

    ~~~js
    import './css/index.css'
    ~~~

- 在webpack.config.js设置如下

    ~~~js
    module.exports={
        module:{ // 配置第三方模块  加载器
            rules:[ //所有第三方模块的匹配规则
            //test表示要匹配的文件规则,正则匹配,匹配所有css结尾的文件，
            //然后用use指明用哪个loader进行处理
            //调用规则是从右到左调用，先调用'css-loader'，然后将结果给'style-loader'
            //当最后的loader调用完毕，会将结果直接交给webpack
            { test : /\.css$/ , use : ['style-loader', 'css-loader'] }

            ]
        }
    }
    ~~~

### .less文件

- less文件也一样，需要安装可以loader
- npm install less-loader -D, 然后需要安装npm i less -D
- 先在main.js导入

    ~~~js
    	import './css/index.less'
    ~~~

- 然后配置

    ~~~js
    module.exports={
        module:{ // 配置第三方模块  加载器
            rules:[ //所有第三方模块的匹配规则
            { test : /\.css$/ , use : ['style-loader', 'css-loader'] },
            {test : /\.less$/, use :['style-loader', 'css-loader', 'less-loader' ]}
            ]
        }
    }
    ~~~

### .scss文件

- 装scss的loader
- npm i sass-loader -D   和npm i node-sass -D(注意，最好用cnpm的源，npm一般安装失败)
- 现在main.js导入

   ~~~js
    import './css/index.scss'
    ~~~

- 然后配置

    ~~~js
        module.exports={
        module:{ // 配置第三方模块  加载器
            rules:[ //所有第三方模块的匹配规则
            //处理scss的loader
            {test : /\.scss$/, use :['style-loader', 'css-loader', 'sass-loader' ]},

            ]
        }
        }
    ~~~

### url-loader的使用

- 默认情况下css无法处理url中的地址
- 安装npm i url-loader file-loader -D
- 然后配置
- 在这里如果后边不加limit就默认是Base64编码
- 加一个limit参数，如果引用的图片大于或者等于limit的值，则不会转为Base64编码，如果图片的值小于limit的值，还是会转为Base64编码
- 如果不加name参数，那么随机给一个图片的名称，或者用一下固定的写法，图片名称则不会发生变化
- 前边[hash:8]-[name]表示给一个hash值的前8位和原始的图片的name通过-相连接，那么就会解决图片名称冲突的问题

    ~~~js
        module.exports={
            module:{ // 配置第三方模块  加载器
                rules:[ //所有第三方模块的匹配规则
                //处理图片链接的url    use只需要一个  ，默认加载的图片是Base64编码
                {test : /\.(jpg|png|bmp|jpeg)$/, use : 'url-loader?limit=16743$name=[hash:8]-[name].[ext]'}
                ]

            }
        }
    ~~~

### 处理匹配字体元素

- 还是用url-loader处理

    ~~~js
        module.exports={
            module:{ // 配置第三方模块  加载器
                rules:[ //所有第三方模块的匹配规则
                //处理字体,url-loader处理
                {test : /\.(ttf|eot|svg|woff|woff2)$/, use : 'url-loader'}
                ]

            }
        }
    ~~~

## 处理es6高级语法

- es6新增的语法，webpack只能处理一部分es6语法，更高级的都不能处理，这时候需要借助第三方的loader
- 第三方会将高级语法降级为低级语法，交给webpack进行处理
- 通过Babel可以将高级语法转换为低级语法
- 在webpack可以安装Babel，babel-loader 8.x的安装方式
  1. 转换工具包
     - npm i -D @babel/core
     - npm install --save-dev @babel/plugin-transform-runtime
     - npm install --save @babel/runtime
  1. 语法包
     - npm i @babel/preset-env
     - npm i babel-preset-mobx
- 在webpack.config.js中新增匹配规则

  ~~~js
          module.exports={
            module:{ // 配置第三方模块  加载器
                rules:[ //所有第三方模块的匹配规则
                //必须排除第三个参数exclude表示：/node_modules/ 文件中的js
                //如果加入/node_modules/ 文件中的js,项目无法运行
                {test : /\.js$/, use : 'babel-loader', exclude: /node_modules/ }
                ]
            }

        }

 ~~~

- 在项目的根目录新建一个.babelrc文件。这个Babel的配置文件属于JSON文件
  - .babelrc文件写如下配置
  - 第一个是语法；第二个是插件，插件不带前缀

    ~~~json
        {
        "presets": ["@babel/preset-env", "mobx"],
        "plugins": [
        "@babel/plugin-transform-runtime"
        ]
        }

    ~~~

## 在webpack中导入vue

### 配置vue

- 安装 npm i vue -S
- 在main.js 导入vue包

> import Vue from 'vue'

- 查找包的规则：
  - 先找有没有node_modules包
  - 然后找有没有对应的vue文件夹
  - 然后在Vue文件夹中找一个package.json的配置文件
  - 然后找package.json的配置文件中的一个main属性

- 如果在main.js使用 import Vue from 'vue'，同时需要完整的vue功能，则需要在webpack.config.js配置

    ~~~js
        module.exports={
            module:{

            },
            resolve:{
                alias:{//设置vue导入包的路径
                    "vue$":'vue/dist/vue.js'
                }
            }

        }

    ~~~

- 或者可以直接使用：import Vue from '../node_modules/vue/dist/vue.js'

### 使用组件

- 为了在runtime-only模式下使用组件，需要在src创建组件文件：XXX.vue

  - .vue文件包含三个部分
    - template
    - style
    - script

- webpack无法打包.vue文件，需要安装 npm i vue-loader vue-template-compiler -D
- 然后在配置文件webpack.config.js 新增loader配置项

    ~~~js
        const VueLoaderPlugin = require('vue-loader/lib/plugin')

          module.exports={
            module:{

            },
            plugins: [
                // 需要增加一个插件在这里vue loader才能使用
                new VueLoaderPlugin()
            ],
            resolve:{

            }
        }
    ~~~

- 在webpack，如果想通过vue,把一个组件放到页面渲染，只能通过render函数实现

    ~~~js
        import login from "./login.vue"

        var m = new Vue({
            el:'#app',
            data:{
                msg:'hello'
            },
            //因为runtime-only所以这样显示不出来
            // components:{
            //     login
            // }

            //因此需要使用render
            render:function(createElements){
                return createElements(login)
            }
        })
    ~~~

- 在.vue文件中使用data数据

  ~~~html
    <template>
    <div>
        <h1>
            这是使用vue定义出来的---{{msg}}
        </h1>
    </div>
    </template>

    <script>
    export default{
        data(){ //组件中的data必须是function
            return{
                msg:'123'
            }
        },
        methods: {
            show(){
                console.log('这是vue中methods')
            }
        },
    }
    </script>

    <style>
    </style>
  ~~~

- es6通过export default 或者export向外暴露成员，用import XX from XX 导入暴露的
  - 向外暴露的成员可以用任意的变量接收
  - 先定义向外暴露的，export default只能在一个文件使用一次,export可以使用多次

      ~~~js
          export default{
            name:'zs'
            }
            export var title = '小'
            export var header = '大'
            export var up = '上'
      ~~~

  - 然后接收暴露,export暴露的只能使用花括号的形式接收，这种就是按需导入，需要几个接收几个，可以用as进行重命名

      ~~~js
          import m1 , {title，header as myheader} from './test.js'
          console.log(m1)
          console.log(title)
          console.log(myheader)
      ~~~

### 使用router

- 安装 npm i vue-router -S
- 然后在main.js进行下面操作

  ~~~js
        import Vue from 'vue'
        import VueRouter from 'vue-router'
        Vue.use(VueRouter)
  ~~~

- 需要把router-view 和router-link写到app.vue中

### 组件中写样式

- 通过scoped将样式限制在自身 ，所以一般都加上scoped

  ~~~html
  <style scoped>
    div{
        color: red;
    }

    </style>
    ~~~

- 普通的style标签只支持普通的样式，如果想要启用scss和less,需要为style设置lang属性

    ~~~html
        <style lang="scss" scoped>
            /*普通的style标签只支持普通的样式，如果想要启用scss和less,需要为style设置lang属性*/

            body{
                div {
                    font-style: italic;

                }
            }

        </style>
    ~~~

## Mint UI组件

- [Mint UI 组件官网](http://mint-ui.github.io/#!/zh-cn)

- 基于vue.js封装出来的组件，基于 Vue.js 的移动端组件库
- 安装npm install mint-ui -S

    ~~~js
        // 引入全部组件
        import Vue from 'vue';
        import Mint from 'mint-ui';
        Vue.use(Mint);
        // 按需引入部分组件
        import { Cell, Checklist } from 'mint-ui';
        Vue.component(Cell.name, Cell);
        Vue.component(Checklist.name, Checklist);
    ~~~

- 找到想用的样式代码，复制黏贴到组件中
  - css样式的使用

    ~~~html
        <mt-button type="default">default</mt-button>
    ~~~

  - js样式的使用，需要在app.vue导入

    ~~~js
        <script>
            //导入toast组件
            import { Toast } from 'mint-ui';
                    //向外暴露
                export default{
                    data(){ //组件中的data必须是function
                        return{
                            msg:'123'
                        }
                    },
                    methods: {
                        show(){
                        Toast('提示信息');
                        }
                    },
                }

            </script>
    ~~~

## MUI 代码片段

- [MUI官网](https://dev.dcloud.net.cn/mui/)

- MUI只是代码片段和bootstrap类似
- MUI并不能使用npm下载，需要自己手动从github下载包，解压，拷贝
