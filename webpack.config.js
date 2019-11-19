//这个配置文件就是一个js文件。通过Node操作，向外暴露一个配置对象
const path = require('path')

//增加一个插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')



module.exports={
    mode: 'development',
    entry:path.join(__dirname,'./src/main.js'),//表示要用webpack打包那个文件,
    output:{
        path:path.join(__dirname,'./dist'),//指定打好的包放到那个目录中去
        filename:'bundle.js' //指定的输出文件

    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ],
    module:{ // 配置第三方模块  加载器
        rules:[ //所有第三方模块的匹配规则
        //test,正则匹配,匹配所有css结尾的文件，然后用use指明用哪个loader进行处理
        { test : /\.css$/ , use : ['style-loader', 'css-loader'] },
        //这是处理less文件的，调用顺序从后往前
        {test : /\.less$/, use :['style-loader', 'css-loader', 'less-loader' ]},
        //处理scss的loader
        {test : /\.scss$/, use :['style-loader', 'css-loader', 'sass-loader' ]},
        //处理图片链接的url    use只需要一个  ，默认加载的图片是Base64编码
        {test : /\.(jpg|png|bmp|jpeg)$/, use : 'url-loader?limit=16743'},
        //处理字体,url-loader处理
        {test : /\.(ttf|eot|svg|woff|woff2)$/, use : 'url-loader'},
        //必须排除第三个参数exclude表示：/node_modules/ 文件中的js
        //如果加入/node_modules/ 文件中的js,项目无法运行
        {test : /\.js$/, use : 'babel-loader', exclude: /node_modules/ },
        //处理vue文件loader
        {test : /\.vue$/, use : 'vue-loader'}
        ]

    },
    resolve:{
        // alias:{//设置vue导入包的路径
        //     "vue$":'vue/dist/vue.js'
        // }
    }
}
