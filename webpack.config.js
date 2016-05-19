var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry:"./js/sketch.js",
    output:{
        path:__dirname,
        filename:"./js/infinite.js"
    },
    devtool: 'eval-source-map',
    module: {
        loaders: [
        //    {
        //         test: /\.css$/,
        //         loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        //     },
        //     {
        //         test: /\.less$/,
        //         loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        //     }
        ]
    },
    plugins: [
        // new ExtractTextPlugin("[name].css")
    ]
}