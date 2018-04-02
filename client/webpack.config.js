//node/webpack
const webpack = require('webpack');
const path = require('path');

//webapck plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//Custom variables
const IS_PROD = (process.env.NODE_ENV === 'production');
const SRC = path.resolve(__dirname, 'src');
const PUBLIC = path.resolve(__dirname, 'public');

var config = {
    entry: {
        'vendor': './src/vendor.ts',
        'index': './src/main.ts',
    },
    output: {
        path: PUBLIC,
        publicPath: '/',
        filename: (IS_PROD ? 'dist/js/[name].[hash:8].min.js' : 'dist/js/[name].js')
    },
    resolve: {
        unsafeCache: true,
        modules: [SRC, 'node_modules'],
        extensions: [
            '.js', '.ts'
        ]
    },
    module: {
        exprContextCritical: false,
        rules: [
            {
                test: /\.ts$/,
                include: SRC,
                use: 'awesome-typescript-loader'
            },
            {
                test: /.html$/,
                include: SRC,
                use: 'html-loader?-minimize'
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'url-loader'
            },
            {
                test: /\.less$/,
                include: SRC,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader'
                    }],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CleanWebpackPlugin(['./public/dist']),
        new webpack.DefinePlugin({
            '__IS_PROD__': IS_PROD
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
        }),
        new ExtractTextPlugin({
            filename: IS_PROD ? 'dist/css/styles.[hash:8].min.css' : 'dist/css/styles.css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ['vendor', 'index'],
            filename: 'index.html'
        })
    ]
};

if (IS_PROD) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            output: {
                comments: false,
            },
            compress: {
                warnings: false,
                drop_console: true
            }
        })
    );
} else {
    config.devtool = 'eval-cheap-module-source-map';
    config.devServer = {
        contentBase: PUBLIC,
        port: 3000,
        compress: true,
        historyApiFallback: true
    };
}

module.exports = config;
