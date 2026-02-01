import { merge } from "webpack-merge";
import ModuleFederationPlugin from "webpack/lib/container/ModuleFederationPlugin.js";
import commonConfig from "./webpack.common.js";

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js"     // template for file naming, primarily for caching issues
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketingMFE",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap"
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } }
    })
  ]
};

export default merge(commonConfig, prodConfig);
