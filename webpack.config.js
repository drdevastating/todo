const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { watch } = require('fs');

module.exports = {
    entry: './src/index.js', // Main entry point
    output: {
        filename: 'bundle.js', // Bundled output file
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    mode: 'development', // Set mode to 'development' or 'production'
    watch: true,
    devServer: {
        watchFiles: ["./src/template.html"],
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            inject: 'body',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};
