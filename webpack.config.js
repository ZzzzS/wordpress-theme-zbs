var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry:"./infinite/sketch.js",
    output:{
        path:"./infinite/assets/",
        filename:"./infinite.js"
    },
    devtool: "source-map",
    module: {
        loaders: [
        //    {
        //         test: /\.css$/,
        //         loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
        //     },
        //     {
        //         test: /\.less$/,
        //         loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader?sourceMap")
        //     },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader?sourceMap")    //为什么是这样，尝试了一个下午啊！！！！！终于成功了
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ]
}
