var path = require('path')
var webpack = require('webpack')
const { VueLoaderPlugin } = require ('vue-loader');

const NODE_ENV = process.env.NODE_ENV

module.exports = {
  // 修改打包入口
  entry: NODE_ENV == 'development' ? './src/main.js' : './index.js',

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'swiper.js',
    library: 'kr-vue-swiper', // 指定的就是你使用require时的模块名
    libraryTarget: 'umd', // 以何种格式打包。libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     'vue-style-loader',
      //     'css-loader',
      //     'sass-loader'
      //   ],
      // },
      // {
      //   test: /\.sass$/,
      //   use: [
      //     'vue-style-loader',
      //     'css-loader',
      //     'sass-loader?indentedSyntax'
      //   ],
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        // 以.js结尾的文件 会被处理
        test: /\.js$/,
        // 是用babel-loader进行处理
        loader: 'babel-loader',
        // 排除 node_modules里面的js文件
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  // https://www.cnblogs.com/wangyingblog/p/7027540.html  cheap-source-map 生成一个没有列信息的SourceMaps文件，不包含loader的sourcemap
  // devtool: '#cheap-source-map'
}

if (process.env.NODE_ENV === 'production') {
  
  module.exports.plugins = (module.exports.plugins || []).concat([
    // 定义全局
    // 在开发环境中存在的提示信息，在生产环境中会去除，不会加载到代码中。可以减少代码量。
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new VueLoaderPlugin(),
    // 配置各个loader的插件，如postcss的 autoprefixer等；
    new webpack.LoaderOptionsPlugin({
      minimize: true   //加载器是否要切换到优化模式。
    })
  ])
}