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
var ActionGroup_1 = __importDefault(require("./ActionGroup"));
var OPACITY_ANIMATION_IN_TIME = 225;
var OPACITY_ANIMATION_OUT_TIME = 195;
var EASING_OUT = react_native_1.Easing.bezier(0.25, 0.46, 0.45, 0.94);
var EASING_IN = react_native_1.Easing.out(EASING_OUT);
// Has same API as https://facebook.github.io/react-native/docs/actionsheetios.html
var ActionSheet = /** @class */ (function (_super) {
    __extends(ActionSheet, _super);
    function ActionSheet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._actionSheetHeight = 360;
        _this.state = {
            isVisible: false,
            isAnimating: false,
            options: null,
            onSelect: null,
            overlayOpacity: new react_native_1.Animated.Value(0),
            sheetOpacity: new react_native_1.Animated.Value(0),
        };
        _this._deferNextShow = undefined;
        _this._setActionSheetHeight = function (_a) {
            var nativeEvent = _a.nativeEvent;
            return (_this._actionSheetHeight = nativeEvent.layout.height);
        };
        _this.showActionSheetWithOptions = function (options, onSelect) {
            var _a = _this.state, isVisible = _a.isVisible, overlayOpacity = _a.overlayOpacity, sheetOpacity = _a.sheetOpacity;
            if (isVisible) {
                _this._deferNextShow = _this.showActionSheetWithOptions.bind(_this, options, onSelect);
                return;
            }
            _this.setState({
                options: options,
                onSelect: onSelect,
                isVisible: true,
                isAnimating: true,
            });
            overlayOpacity.setValue(0);
            sheetOpacity.setValue(0);
            react_native_1.Animated.parallel([
                react_native_1.Animated.timing(overlayOpacity, {
                    toValue: 0.32,
                    easing: EASING_OUT,
                    duration: OPACITY_ANIMATION_IN_TIME,
                    useNativeDriver: _this.props.useNativeDriver,
                }),
                react_native_1.Animated.timing(sheetOpacity, {
                    toValue: 1,
                    easing: EASING_OUT,
                    duration: OPACITY_ANIMATION_IN_TIME,
                    useNativeDriver: _this.props.useNativeDriver,
                }),
            ]).start(function (result) {
                if (result.finished) {
                    _this.setState({
                        isAnimating: false,
                    });
                    _this._deferNextShow = undefined;
                }
            });
            // @ts-ignore: Argument of type '"actionSheetHardwareBackPress"' is not assignable to parameter of type '"hardwareBackPress"'
            react_native_1.BackHandler.addEventListener('actionSheetHardwareBackPress', _this._selectCancelButton);
        };
        _this._selectCancelButton = function () {
            var options = _this.state.options;
            if (!options) {
                return false;
            }
            if (typeof options.cancelButtonIndex === 'undefined') {
                return;
            }
            else if (typeof options.cancelButtonIndex === 'number') {
                return _this._onSelect(options.cancelButtonIndex);
            }
            else {
                return _this._animateOut();
            }
        };
        _this._onSelect = function (index) {
            var _a = _this.state, isAnimating = _a.isAnimating, onSelect = _a.onSelect;
            if (isAnimating) {
                return false;
            }
            onSelect && onSelect(index);
            return _this._animateOut();
        };
        _this._animateOut = function () {
            var _a = _this.state, isAnimating = _a.isAnimating, overlayOpacity = _a.overlayOpacity, sheetOpacity = _a.sheetOpacity;
            if (isAnimating) {
                return false;
            }
            // @ts-ignore: Argument of type '"actionSheetHardwareBackPress"' is not assignable to parameter of type '"hardwareBackPress"'
            react_native_1.BackHandler.removeEventListener('actionSheetHardwareBackPress', _this._selectCancelButton);
            _this.setState({
                isAnimating: true,
            });
            react_native_1.Animated.parallel([
                react_native_1.Animated.timing(overlayOpacity, {
                    toValue: 0,
                    easing: EASING_IN,
                    duration: OPACITY_ANIMATION_OUT_TIME,
                    useNativeDriver: _this.props.useNativeDriver,
                }),
                react_native_1.Animated.timing(sheetOpacity, {
                    toValue: 0,
                    easing: EASING_IN,
                    duration: OPACITY_ANIMATION_OUT_TIME,
                    useNativeDriver: _this.props.useNativeDriver,
                }),
            ]).start(function (result) {
                if (result.finished) {
                    _this.setState({
                        isVisible: false,
                        isAnimating: false,
                    });
                    if (_this._deferNextShow) {
                        _this._deferNextShow();
                    }
                }
            });
            return true;
        };
        return _this;
    }
    ActionSheet.prototype.render = function () {
        var _a = this.state, isVisible = _a.isVisible, overlayOpacity = _a.overlayOpacity, options = _a.options;
        var useModal = options ? options.useModal === true : false;
        var overlay = isVisible ? (<react_native_1.Animated.View style={[
            styles.overlay,
            {
                opacity: overlayOpacity,
            },
        ]}/>) : null;
        // While the sheet is visible, hide the rest of the app's content from screen readers.
        var appContent = (<react_native_1.View style={styles.flexContainer} importantForAccessibility={isVisible ? 'no-hide-descendants' : 'auto'}>
        {React.Children.only(this.props.children)}
      </react_native_1.View>);
        return (<react_native_1.View pointerEvents={this.props.pointerEvents} style={styles.flexContainer}>
        {appContent}
        {isVisible && !useModal && (<React.Fragment>
            {overlay}
            {this._renderSheet()}
          </React.Fragment>)}
        {isVisible && useModal && (<react_native_1.Modal animationType="none" transparent={true} onRequestClose={this._selectCancelButton}>
            {overlay}
            {this._renderSheet()}
          </react_native_1.Modal>)}
      </react_native_1.View>);
    };
    ActionSheet.prototype._renderSheet = function () {
        var _a = this.state, options = _a.options, isAnimating = _a.isAnimating, sheetOpacity = _a.sheetOpacity;
        if (!options) {
            return null;
        }
        var optionsArray = options.options, icons = options.icons, tintIcons = options.tintIcons, destructiveButtonIndex = options.destructiveButtonIndex, destructiveColor = options.destructiveColor, textStyle = options.textStyle, tintColor = options.tintColor, title = options.title, titleTextStyle = options.titleTextStyle, message = options.message, messageTextStyle = options.messageTextStyle, autoFocus = options.autoFocus, showSeparators = options.showSeparators, containerStyle = options.containerStyle, separatorStyle = options.separatorStyle;
        return (<react_native_1.TouchableWithoutFeedback importantForAccessibility="yes" onPress={this._selectCancelButton}>
        <react_native_1.Animated.View needsOffscreenAlphaCompositing={isAnimating} style={[
            styles.sheetContainer,
            {
                opacity: sheetOpacity,
                transform: [
                    {
                        translateY: sheetOpacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [this._actionSheetHeight, 0],
                        }),
                    },
                ],
            },
        ]}>
          <react_native_1.View style={styles.sheet} onLayout={this._setActionSheetHeight}>
            <ActionGroup_1.default options={optionsArray} icons={icons} tintIcons={tintIcons === undefined ? true : tintIcons} destructiveButtonIndex={destructiveButtonIndex} destructiveColor={destructiveColor} onSelect={this._onSelect} startIndex={0} length={optionsArray.length} textStyle={textStyle || {}} tintColor={tintColor} title={title || undefined} titleTextStyle={titleTextStyle} message={message || undefined} messageTextStyle={messageTextStyle} autoFocus={autoFocus} showSeparators={showSeparators} containerStyle={containerStyle} separatorStyle={separatorStyle}/>
          </react_native_1.View>
        </react_native_1.Animated.View>
      </react_native_1.TouchableWithoutFeedback>);
    };
    ActionSheet.defaultProps = {
        useNativeDriver: true,
    };
    return ActionSheet;
}(React.Component));
exports.default = ActionSheet;
var styles = react_native_1.StyleSheet.create({
    flexContainer: {
        flex: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
    },
    sheetContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: 'transparent',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    sheet: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});
