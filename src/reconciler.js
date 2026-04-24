import Reconciler from "react-reconciler";
import { DefaultEventPriority } from "react-reconciler/constants";
import RectElement from "./elements/Rect"

let eventBridge = null;

export function setEventBridge(instance) {
  if(!eventBridge) {
    eventBridge = instance;
  }

  return eventBridge;
}

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
  resetAfterCommit(container) {
  },
  getChildHostContext()            { return {}; },
  shouldSetTextContent()           { return false; },
  createTextInstance(text) {
    console.log("createTextInstance", text);
    return { type: "TEXT", text };
  },
  createInstance(type, props) {
    console.log("createInstance", type);
    if(type === 'rect') {
      return new RectElement(eventBridge, props);
    }
    return { type, props, children: [] };
  },
  appendInitialChild(parent, child) {
    console.log("appendInitialChild", parent.type, "<-", child.type);
    parent.children.push(child);
  },
  appendChild(parent, child)                    { parent.children.push(child); },
  appendChildToContainer(container, child) {
    console.log("appendChildToContainer", container);
    if(!Object.hasOwnProperty(container, 'children')) {
      container.children = [];
    }
    container.children.push(child);
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

export const JReconciler = Reconciler(Config);
