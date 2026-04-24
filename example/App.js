"use strict";

var _react = _interopRequireDefault(require("react"));
var _bundle = require("../dist/bundle");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function App() {
  return /*#__PURE__*/_react.default.createElement("rect", {
    x: 100,
    y: 100,
    w: 100,
    h: 100
  });
}
(0, _bundle.render)(/*#__PURE__*/_react.default.createElement(App, null));