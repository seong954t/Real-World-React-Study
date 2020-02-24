const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    name     : "kst",
    mode     : "development",
    devtool  : "eval",
    resolve  : {
        extensions: ['.js', '.tsx', '.ts', '.json']
    },
    entry    : './src/index.tsx',
    module   : {
        rules: [
            {
                test   : /\.(tsx?)|(js)$/,
                loader : "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/typescript'],
                    plugins: [
                        ["@babel/plugin-proposal-decorators", {"legacy": true}],
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-transform-runtime'
                    ]
                }
            },
            {
                test   : /\.(css)|(less)$/,
                exclude: /node_modules/,
                use    : [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader : 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]'
                            },
                        }
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            },
            {
                test   : /\.(png)$/,
                loader : 'url-loader'
            }
        ]
    },
    output   : {
        path      : `${__dirname}/dist`,
        filename  : "bundle.js",
        publicPath: "/"
    },
    plugins  : [
        new HtmlWebpackPlugin({
            template: `${__dirname}\\public\\index.html`,
        })
    ],
    devtool  : 'inline-source-map',
    devServer: {
        host              : 'localhost',
        port              : 3000,
        open              : true,
        historyApiFallback: true,
        hot               : true,
        inline            : true
    }
}