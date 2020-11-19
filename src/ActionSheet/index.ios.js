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
var ActionSheet = /** @class */ (function (_super) {
    __extends(ActionSheet, _super);
    function ActionSheet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActionSheet.prototype.render = function () {
        return (<react_native_1.View pointerEvents={this.props.pointerEvents} style={{ flex: 1 }}>
        {React.Children.only(this.props.children)}
      </react_native_1.View>);
    };
    ActionSheet.prototype.showActionSheetWithOptions = function (dataOptions, onSelect) {
        // ...dataOptions include other keys which use in android and web, thats why `Android-Only options` Crash on IOS
        var cancelButtonIndex = dataOptions.cancelButtonIndex, destructiveButtonIndex = dataOptions.destructiveButtonIndex, options = dataOptions.options, tintColor = dataOptions.tintColor;
        var iosOptions = {
            cancelButtonIndex: cancelButtonIndex,
            destructiveButtonIndex: destructiveButtonIndex,
            options: options,
            tintColor: tintColor,
            // A null title or message on iOS causes a crash
            title: dataOptions.title || undefined,
            message: dataOptions.message || undefined,
            anchor: dataOptions.anchor || undefined,
        };
        react_native_1.ActionSheetIOS.showActionSheetWithOptions(iosOptions, onSelect);
    };
    return ActionSheet;
}(React.Component));
exports.default = ActionSheet;
