import { merge } from "webpack-merge";
// import HtmlWebpackPlugin from "html-webpack-plugin";
import ModuleFederationPlugin from "webpack/lib/container/ModuleFederationPlugin.js";
import commonConfig from "./webpack.common.js";

/*
** Copilot's code for dynamically adding shared dependencies from package.json **

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { dependencies } = require("../package.json");

const sharedDependencies = Object.keys(dependencies).reduce((shared, dep) => {
  return {
    ...shared,
    [dep]: { requiredVersion: dependencies[dep] }
  };
}, {});

sharedDependencies.react = {
  singleton: true,
  requiredVersion: dependencies.react
};

sharedDependencies["react-dom"] = {
  singleton: true,
  requiredVersion: dependencies["react-dom"]
};
*/

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html"
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketingModule: "marketingMFE@http://localhost:8081/remoteEntry.js"
      },
      // shared: sharedDependencies
      shared: { react: { singleton: true }, "react-dom": { singleton: true } }
    })
  ]
};

export default merge(commonConfig, devConfig);
