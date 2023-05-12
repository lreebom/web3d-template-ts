const {merge} = require('webpack-merge');
const common = require('./webpack.config.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BuildConfig = require("./build-config/build-config");

module.exports = merge(common, {
    mode: 'development',
    output: {
        path: BuildConfig.output,
        filename: '[name].bundle.js',
        asyncChunks: false,
        clean: {
            keep: /^thumb/,
        },
    },
    performance: {
        hints: false,
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
            filename: '[name].bundle.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            },
            {
                test: /\.(svg|png|jpg|gif)$/i,
                exclude: /node_modules/,
                type: 'asset',
                generator: {
                    filename: 'images/[name][ext]',
                },
            },
            {
                test: /\.(mp3|ogg)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: 'audios/[name][ext]',
                },
            },
            {
                test: /\.(mp4|webm)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: 'videos/[name][ext]',
                },
            },
            {
                test: /\.(glb)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: 'models/[name][ext]',
                },
            },
            {
                test: /\.(glsl)$/i,
                exclude: /node_modules/,
                type: 'asset/source'
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        // host: "local-ipv4",
        port: 3434,
        static: {
            directory: BuildConfig.output,
        },
        proxy: {
            '/api': 'http://10.10.15.31'
        }
    }
});