const {merge} = require('webpack-merge');
const common = require('./webpack.config.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BuildConfig = require("./build-config/build-config");

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: BuildConfig.output,
        filename: '[name].[contenthash:8].bundle.js',
        asyncChunks: false,
        clean: {
            keep: /^thumb/,
        },
    },
    performance: {
        hints: "warning",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: BuildConfig.title,
            filename: "index.html",
            template: BuildConfig.htmlTemplate,
            inject: "body",
            scriptLoading: "defer",
            // favicon: path.join(appBuildInfo.appInfo.path, "src/favicon.ico"),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].bundle.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[contenthash:8][ext]',
                },
            },
            {
                test: /\.(svg|png|jpg|gif)$/i,
                exclude: /node_modules/,
                type: 'asset',
                generator: {
                    filename: 'images/[name].[contenthash:8][ext]',
                },
            },
            {
                test: /\.(mp3|ogg)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: 'audios/[name].[contenthash:8][ext]',
                },
            },
            {
                test: /\.(mp4|webm)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: 'videos/[name].[contenthash:8][ext]',
                },
            },
            {
                test: /\.(glb)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: 'models/[name].[contenthash:8][ext]',
                },
            },
            {
                test: /\.(glsl)$/i,
                exclude: /node_modules/,
                type: 'asset/source'
            }
        ]
    },
    devtool: false,
});