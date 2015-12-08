var path = require('path');
var webpack = require('webpack');
var join = path.join.bind(path, __dirname, '..');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        join('public/index.jsx')
    ],
    devServer: {
        contentBase: join("public"),
        info: true, //  --no-info option
        hot: true,
        inline: true,
        port: 3000
    },

    output: {
        path: join(".hot"),
        filename: 'app.entry.js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js(x)?$/,
                exclude: /node_modules/,
                //do this to prevent babel from translating everything.
                include: [
                    join('src'),
                    join('public')
                ],
                loaders: ['react-hot', 'babel?stage=0']
            },
            {
                test: /\.js(x)?$/,
                exclude: [
                    /node_modules\/(?!(subschema|component-playground|react-))/,
                    join('src'),
                    join('public'),
                ],
                loaders: ['babel?stage=0']
            },
            {test: /\.(png|jpe?g|mpe?g|gif)$/, loader: 'url?limit=100000'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=image/svg+xml"},
            // Optionally extract less files
            // or any other compile-to-css language
            {
                test: /\.css$/,
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                loaders: ['style', 'css', 'less-loader']
            }
        ]
    },
    postcss: [
        require('autoprefixer'),
        require('postcss-color-rebeccapurple')
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'subschema': join('node_modules/subschema/src/index.jsx'),
            'Subschema': join('node_modules/subschema/src/index.jsx'),
            'react': join('node_modules/react'),
            'subschema-styles': join('node_modules/subschema/src/styles')
        }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        function () {
            this.plugin("done", function (stats) {
                stats = stats.toJson();
                console.error(JSON.stringify({
                    assetsByChunkName: stats.assetsByChunkName
                }));
            });
        }
    ]

};

