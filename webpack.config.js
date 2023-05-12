const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BuildConfig = require("./build-config/build-config");

module.exports = {
    entry: {
        index: {
            import: BuildConfig.entry
        }
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', 'jpg', 'png', 'glb'],
        alias: {}
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/i,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', "postcss-loader"]
            },
        ]
    }
};