const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');


module.exports = {
    context: path.resolve(__dirname, '..'),
    mode: 'production',
    entry: {
        vendor1: ['vue', 'vue-router','axios', 'vue-axios', 'vuex','qs','dayjs'],
        vendor2: ['element-ui']

    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "static/js/[name].[contenthash:8].js",
        library: "[name]",
        publicPath: '/'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
                include: [
                    path.resolve(__dirname, "../node_modules")
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                // flags to apply these rules, even if they are overridden (advanced option)
                loader: "url-loader",
                // options for the loader
                options: {
                    limit: 10000,
                    name: 'static/images/[name].[contenthash:8].[ext]'
                },
                include: [
                    path.resolve(__dirname, "../node_modules")
                ]
            },
            {
                test: /\.(ttf|woff)$/,
                // flags to apply these rules, even if they are overridden (advanced option)
                loader: "url-loader",
                // options for the loader
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[contenthash:8].[ext]'
                },
                include: [
                    path.resolve(__dirname, "../node_modules")
                ]
            }
        ]
    },
    devtool: false,
    plugins: [
        new CompressionPlugin({}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')//告诉vue全家桶,目前是生产环境,不必要的代码就省略掉
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css'
        }),
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, '..', "[name]-manifest.json"),
            name: "[name]"
        }),
        new HtmlWebpackPlugin({
            title: '完美后台关系管理系统',
            filename: 'template.html',
            template: 'index.html',
            inject: 'body',
            minify: {
                removeAttributeQuotes: true//压缩 去掉引号
            }
        })
    ]
};