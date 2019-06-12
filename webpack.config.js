const HtmlWebpackPlugin = require("html-webpack-plugin");
var AemSyncPlugin = require("@pjbrof/aemsync-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    app: "./src/index.js",
    another: "./src/foo.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8000
  },
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: "all"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new AemSyncPlugin({
      targets: ["http://admin:admin@localhost:4502"],
      workingDir: "./",
      exclude: "/node_modules/",
      interval: 300
    })
  ]
};
