import { merge } from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ModuleFederationPlugin from "webpack/lib/container/ModuleFederationPlugin.js";
import commonConfig from "./webpack.common.js";

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketingModule: "marketingMFE@http://localhost:8081/remoteEntry.js"
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    })
  ]
};

export default merge(commonConfig, devConfig);
