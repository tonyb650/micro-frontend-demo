import { merge } from "webpack-merge";
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

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js", // template for file naming, primarily for caching issues
    publicPath: '/container/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketingModule: `marketingMFE@${domain}/marketing/remoteEntry.js`
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } }
    })
  ]
};

export default merge(commonConfig, prodConfig);
