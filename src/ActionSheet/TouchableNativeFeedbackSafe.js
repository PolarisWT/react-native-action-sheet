"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_native_1 = require("react-native");
// This TouchableOpacity has the same staic method of TouchableNativeFeedback
var CustomTouchableOpacity = /** @class */ (function (_super) {
    __extends(CustomTouchableOpacity, _super);
    function CustomTouchableOpacity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomTouchableOpacity.prototype.render = function () {
        return <react_native_1.TouchableOpacity {...this.props}>{this.props.children}</react_native_1.TouchableOpacity>;
    };
    CustomTouchableOpacity.SelectableBackground = function () { return ({}); };
    CustomTouchableOpacity.SelectableBackgroundBorderless = function () { return ({}); };
    CustomTouchableOpacity.Ripple = function (color, borderless) { return ({}); };
    return CustomTouchableOpacity;
}(React.Component));
var TouchableComponent = react_native_1.Platform.select({
    web: CustomTouchableOpacity,
    default: react_native_1.Platform.Version <= 20 ? CustomTouchableOpacity : react_native_1.TouchableNativeFeedback,
});
var TouchableNativeFeedbackSafe = /** @class */ (function (_super) {
    __extends(TouchableNativeFeedbackSafe, _super);
    function TouchableNativeFeedbackSafe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchableNativeFeedbackSafe.prototype.render = function () {
        if (TouchableComponent === react_native_1.TouchableNativeFeedback) {
            return (<TouchableComponent {...this.props} style={{}}>
          <react_native_1.View style={this.props.style}>{this.props.children}</react_native_1.View>
        </TouchableComponent>);
        }
        // @ts-ignore: JSX element type 'TouchableComponent' does not have any construct or call signatures
        return <TouchableComponent {...this.props}>{this.props.children}</TouchableComponent>;
    };
    TouchableNativeFeedbackSafe.SelectableBackground = TouchableComponent.SelectableBackground;
    TouchableNativeFeedbackSafe.SelectableBackgroundBorderless = TouchableComponent.SelectableBackgroundBorderless;
    TouchableNativeFeedbackSafe.Ripple = TouchableComponent.Ripple;
    return TouchableNativeFeedbackSafe;
}(React.Component));
exports.default = TouchableNativeFeedbackSafe;
