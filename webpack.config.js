const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/js/main.js",
  watch: true,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },

      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets",
              name: "[name].[ext]"
            }
          }
        ]
      },
      // {
      //   test: /\.(woff|woff2|ttf)$/,
      //   use: {
      //     loader: "url-loader",
      //     options: {
      //       name: "[name].[ext]",
      //       outputPath: "fonts/"
      //     }
      //   }
      // },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: {} },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                require("autoprefixer")({ preset: "default" }),
                require("cssnano")({
                  preset: "default"
                })
              ]
            }
          },
          { loader: "sass-loader", options: {} }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new CopyPlugin([{ from: "./src/assets", to: "assets" }]),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
};
