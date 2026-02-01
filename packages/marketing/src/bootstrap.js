// Mount function to start up the app
// handle dev/isolation call mount ELSE just export mount
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const mount = (el) => {
  ReactDOM.render(<App/>, el);
};
console.log("Inside packages/marketing/src/bootstrap.js");

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
