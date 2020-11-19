import * as React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
  View,
} from 'react-native';
import { hook } from 'cavy';

// This TouchableOpacity has the same staic method of TouchableNativeFeedback
class CustomTouchableOpacity extends React.Component {
  static SelectableBackground = () => ({});
  static SelectableBackgroundBorderless = () => ({});
  static Ripple = (color: string, borderless?: boolean) => ({});

  render() {
    return <TouchableOpacity {...this.props}>{this.props.children}</TouchableOpacity>;
  }
}

const TouchableComponent = Platform.select({
  web: CustomTouchableOpacity,
  default: Platform.Version <= 20 ? CustomTouchableOpacity : TouchableNativeFeedback,
});

type Props = TouchableWithoutFeedbackProps & {
  pressInDelay: number;
  background: any;
  generateTestHook: Function;
  key: number;
};

class TouchableNativeFeedbackSafe extends React.Component<Props> {
  static SelectableBackground = TouchableComponent.SelectableBackground;
  static SelectableBackgroundBorderless = TouchableComponent.SelectableBackgroundBorderless;
  static Ripple = TouchableComponent.Ripple;

  render() {
    const { generateTestHook } = this.props;

    if (TouchableComponent === TouchableNativeFeedback) {
      return (
        <TouchableComponent
          {...this.props}
          style={{}}
          ref={generateTestHook(`ActionSheetItem.${this.props.key}`)}
        >
          <View style={this.props.style}>{this.props.children}</View>
        </TouchableComponent>
      );
    }

    // @ts-ignore: JSX element type 'TouchableComponent' does not have any construct or call signatures
    return (
      <TouchableComponent
        {...this.props}
        ref={generateTestHook(`ActionSheetItem.${this.props.key}`)}
      >
        {this.props.children}
      </TouchableComponent>
    );
  }
}

export default hook(TouchableNativeFeedbackSafe);
