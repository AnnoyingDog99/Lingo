const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    usedExports: true,
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  //   module: {
  //     rules: [
  //       {
  //         test: /\.css$/i,
  //         use: ['style-loader', 'css-loader'],
  //       },
  //       {
  //         test: /\.(png|svg|jpg|jpeg|gif)$/i,
  //         type: 'asset/resource',
  //       },
  //       {
  //         test: /\.(woff|woff2|eot|ttf|otf)$/i,
  //         type: 'asset/resource',
  //       },
  //     ],
  //   },
};