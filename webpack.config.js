const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devmode = process.env.NODE_ENV!=='production'
module.exports = {

    entry: './frontend/src/app.js',
    output: {
        path: path.resolve(__dirname, 'backend/src/public/build'),
        filename: 'bundle.js'
    },
    mode:'production',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    devmode ? "style-loader": MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './frontend/src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new MiniCssExtractPlugin({
            filename:"styles/style.css"
        })
    ],
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
};