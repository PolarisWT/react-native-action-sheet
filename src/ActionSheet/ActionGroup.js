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
var react_native_1 = require("react-native");
var cavy_1 = require("cavy");
var TouchableNativeFeedbackSafe_1 = __importDefault(require("./TouchableNativeFeedbackSafe"));
var BLACK_54PC_TRANSPARENT = '#0000008a';
var BLACK_87PC_TRANSPARENT = '#000000de';
var DESTRUCTIVE_COLOR = '#d32f2f';
/**
 * Can be used as a React ref for a component to auto-focus for accessibility on render.
 * @param ref The component to auto-focus
 */
var focusViewOnRender = function (ref) {
    if (ref) {
        var reactTag = react_native_1.findNodeHandle(ref);
        if (reactTag) {
            if (react_native_1.Platform.OS === 'android') {
                // @ts-ignore: sendAccessibilityEvent is missing from @types/react-native
                react_native_1.UIManager.sendAccessibilityEvent(reactTag, 
                // @ts-ignore: AccessibilityEventTypes is missing from @types/react-native
                react_native_1.UIManager.AccessibilityEventTypes.typeViewFocused);
            }
            else {
                react_native_1.AccessibilityInfo.setAccessibilityFocus(reactTag);
            }
        }
    }
};
var ActionGroup = /** @class */ (function (_super) {
    __extends(ActionGroup, _super);
    function ActionGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._renderRowSeparator = function (key) {
            return (<react_native_1.View key={"separator-" + key} style={[styles.rowSeparator, _this.props.separatorStyle]}/>);
        };
        _this._renderTitleContent = function () {
            var _a = _this.props, title = _a.title, titleTextStyle = _a.titleTextStyle, message = _a.message, messageTextStyle = _a.messageTextStyle, showSeparators = _a.showSeparators;
            if (!title && !message) {
                return null;
            }
            return (<react_native_1.View>
        <react_native_1.View style={[styles.titleContainer, { paddingBottom: showSeparators ? 24 : 16 }]}>
          {!!title && <react_native_1.Text style={[styles.title, titleTextStyle]}>{title}</react_native_1.Text>}
          {!!message && <react_native_1.Text style={[styles.message, messageTextStyle]}>{message}</react_native_1.Text>}
        </react_native_1.View>
        {!!showSeparators && _this._renderRowSeparator('title')}
      </react_native_1.View>);
        };
        _this._renderIconElement = function (iconSource, color) {
            var tintIcons = _this.props.tintIcons;
            if (!iconSource) {
                return null;
            }
            if (typeof iconSource === 'number') {
                var iconStyle = [styles.icon, { tintColor: tintIcons ? color : undefined }];
                return <react_native_1.Image fadeDuration={0} source={iconSource} resizeMode="contain" style={iconStyle}/>;
            }
            else {
                return <react_native_1.View style={styles.icon}>{iconSource}</react_native_1.View>;
            }
        };
        _this._renderOptionViews = function () {
            var _a = _this.props, options = _a.options, icons = _a.icons, destructiveButtonIndex = _a.destructiveButtonIndex, _b = _a.destructiveColor, destructiveColor = _b === void 0 ? DESTRUCTIVE_COLOR : _b, generateTestHook = _a.generateTestHook, onSelect = _a.onSelect, startIndex = _a.startIndex, length = _a.length, textStyle = _a.textStyle, tintColor = _a.tintColor, autoFocus = _a.autoFocus, showSeparators = _a.showSeparators;
            var optionViews = [];
            var nativeFeedbackBackground = TouchableNativeFeedbackSafe_1.default.Ripple('rgba(180, 180, 180, 1)', false);
            var _loop_1 = function (i) {
                var defaultColor = tintColor
                    ? tintColor
                    : (textStyle || {}).color || BLACK_87PC_TRANSPARENT;
                var color = i === destructiveButtonIndex ? destructiveColor : defaultColor;
                var iconSource = icons != null ? icons[i] : null;
                optionViews.push(<TouchableNativeFeedbackSafe_1.default ref={generateTestHook("ActionSheetItem." + i, function () {
                    return autoFocus && i === 0 ? focusViewOnRender : undefined;
                })} key={i} pressInDelay={0} background={nativeFeedbackBackground} onPress={function () { return onSelect(i); }} style={styles.button} accessibilityRole="button" accessibilityLabel={options[i]}>
          {_this._renderIconElement(iconSource, color)}
          <react_native_1.Text style={[styles.text, textStyle, { color: color }]}>{options[i]}</react_native_1.Text>
        </TouchableNativeFeedbackSafe_1.default>);
                if (showSeparators && i < startIndex + length - 1) {
                    optionViews.push(_this._renderRowSeparator(i));
                }
            };
            for (var i = startIndex; i < startIndex + length; i++) {
                _loop_1(i);
            }
            return optionViews;
        };
        return _this;
    }
    ActionGroup.prototype.render = function () {
        return (<react_native_1.View style={[styles.groupContainer, this.props.containerStyle]}>
        {this._renderTitleContent()}
        <react_native_1.ScrollView>{this._renderOptionViews()}</react_native_1.ScrollView>
      </react_native_1.View>);
    };
    ActionGroup.defaultProps = {
        title: null,
        message: null,
        showSeparators: false,
        tintIcons: true,
        textStyle: {},
    };
    return ActionGroup;
}(React.Component));
exports.default = cavy_1.hook(ActionGroup);
var styles = react_native_1.StyleSheet.create({
    button: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        height: 56,
        paddingHorizontal: 16,
    },
    groupContainer: {
        backgroundColor: '#ffffff',
        overflow: 'hidden',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 32,
    },
    message: {
        marginTop: 12,
        fontSize: 14,
        color: BLACK_54PC_TRANSPARENT,
        textAlignVertical: 'center',
    },
    rowSeparator: {
        backgroundColor: '#dddddd',
        height: 1,
        width: '100%',
    },
    text: {
        fontSize: 16,
        color: BLACK_87PC_TRANSPARENT,
        textAlignVertical: 'center',
    },
    title: {
        fontSize: 16,
        color: BLACK_54PC_TRANSPARENT,
        textAlignVertical: 'center',
    },
    titleContainer: {
        alignItems: 'flex-start',
        padding: 16,
        paddingTop: 24,
    },
});
