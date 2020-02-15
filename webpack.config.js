const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const outputDirectory = 'dist';

module.exports = {
    mode: 'development',
    entry: ["./src/main.js"],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, outputDirectory),
        publicPath: '/',
        globalObject: `(typeof self !== 'undefined' ? self : this)`
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            }, {
                test: /\.vue?$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    }
                ]
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers'),
                                indentedSyntax: true // optional
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|eot|wav|mp3)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'typeof window': JSON.stringify('object')
        })
    ],
    externals: {
        vue: 'Vue',
        'vuetify': 'Vuetify'
    }
};
