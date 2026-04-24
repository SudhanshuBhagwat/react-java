"use strict";

var _react = _interopRequireDefault(require("react"));
var _bundle = require("../dist/bundle");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function App() {
  const [position, setPosition] = _react.default.useState([0, 0]);
  _react.default.useEffect(() => {
    const interval = setInterval(() => {
      setPosition(position => {
        const x = position[0];
        const y = position[1];
        return [x + 1, y + 1];
      });
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement("rect", {
    x: position[0],
    y: position[1],
    w: 100,
    h: 100
  });
}
(0, _bundle.render)(/*#__PURE__*/_react.default.createElement(App, null));