import React from "react";
import Reconciler from "react-reconciler";
import App from "./App.js";

const Config = {};

const renderer = Reconciler(Config);
const root = renderer.createContainer("main");
renderer.updateContainer(<App />, root, null, () => {});
console.log(renderer);
