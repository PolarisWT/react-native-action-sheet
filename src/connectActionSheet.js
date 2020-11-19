"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var context_1 = require("./context");
var hoist_non_react_statics_1 = __importDefault(require("hoist-non-react-statics"));
function connectActionSheet(WrappedComponent) {
    var ConnectedActionSheet = function (props) {
        return (<context_1.Consumer>
        {function (_a) {
            var showActionSheetWithOptions = _a.showActionSheetWithOptions;
            return (<WrappedComponent {...props} showActionSheetWithOptions={showActionSheetWithOptions}/>);
        }}
      </context_1.Consumer>);
    };
    return hoist_non_react_statics_1.default(ConnectedActionSheet, WrappedComponent);
}
exports.default = connectActionSheet;
