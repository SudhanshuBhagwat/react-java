import React from "react";
import Reconciler from "react-reconciler";
import { DefaultEventPriority } from "react-reconciler/constants.js";
import App from "./App.js";

const Config = {
  supportsMutation: true,
  isPrimaryRenderer: true,
  supportsPersistence: false,
  supportsHydration: false,
  trackSchedulerEvent(...args) {
    console.log("trackSchedulerEvent ", args);
  },
  resolveUpdatePriority(...args) {
    console.log("resolveUpdatePriority ", args);
    return DefaultEventPriority;
  },
  resolveEventTimeStamp() {
    return new Date();
  },
  resolveEventType()               { return null; },
  getRootHostContext()              { return {}; },
  getCurrentUpdatePriority()       { return DefaultEventPriority; },
  setCurrentUpdatePriority()       {},
  prepareForCommit()               { return null; },
  // dev reconciler uses this to bind console output to fiber — must return a fn
  bindToConsole(methodName, args, badgeName) {
    return console[methodName].bind(console, ...args);
  },
  clearContainer(...args) {
    console.log("clearContainer ", args);
  },
  resetAfterCommit(...args) {
    console.log("resetAfterCommit ", args);
  },
  getChildHostContext()            { return {}; },
  shouldSetTextContent()           { return false; },
  createTextInstance(text) {
    console.log("createTextInstance", text);
    return { type: "TEXT", text };
  },
  createInstance(type, props) {
    console.log("createInstance", type);
    return { type, props, children: [] };
  },
  appendInitialChild(parent, child) {
    console.log("appendInitialChild", parent.type, "<-", child.type);
    parent.children.push(child);
  },
  appendChild(parent, child)                    { parent.children.push(child); },
  appendChildToContainer(container, child) {
    console.log("appendChildToContainer", child);
  },
  removeChild(parent, child)                    { parent.children = parent.children.filter(c => c !== child); },
  removeChildFromContainer(container, child)    {},
  insertBefore(parent, child, before)           { parent.children.splice(parent.children.indexOf(before), 0, child); },
  insertInContainerBefore(container, child, before) {},
  finalizeInitialChildren()        { return false; },
  detachDeletedInstance(...args) {
    console.log("detachDeletedInstance ", args);
  },
};

const renderer = Reconciler(Config);

const container = { type: "ROOT" };
const root = renderer.createContainer(
  container, 
  0,
  null,
  false,
  null,
  "",
  (err) => console.error("Recoverable error:", err),
  null
);

renderer.updateContainer(<App />, root, null, () => {
  console.log("Render complete");
});
