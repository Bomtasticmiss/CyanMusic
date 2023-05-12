const path = require("path")
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode: "production",
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist1"),
        filename: 'bundle.js'//绝对路径
    },
    module: {
        rules: [
            // loader的配置
            {
                test: /\.css$/i,
                use: ["vue-style-loader", "css-loader"],
            },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    "vue-style-loader",
                    "css-loader",
                    "less-loader",
                ],
            },
            {
                test: /\.vue$/i,
                use: ["vue-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024//10kb
                    }
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.sass', '.svg', '.less', '.vue'],
    }
}