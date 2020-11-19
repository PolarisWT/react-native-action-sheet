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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var ActionSheet_1 = __importDefault(require("./ActionSheet"));
var context_1 = require("./context");
var ActionSheetProvider = /** @class */ (function (_super) {
    __extends(ActionSheetProvider, _super);
    function ActionSheetProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.getContext = function () {
            return {
                showActionSheetWithOptions: function (options, callback) {
                    _this._actionSheetRef.current !== null &&
                        _this._actionSheetRef.current.showActionSheetWithOptions(options, callback);
                },
            };
        };
        _this._actionSheetRef = React.createRef();
        return _this;
    }
    ActionSheetProvider.prototype.render = function () {
        return (<context_1.Provider value={this.getContext()}>
        <ActionSheet_1.default ref={this._actionSheetRef}>
          {React.Children.only(this.props.children)}
        </ActionSheet_1.default>
      </context_1.Provider>);
    };
    return ActionSheetProvider;
}(React.Component));
exports.default = ActionSheetProvider;
