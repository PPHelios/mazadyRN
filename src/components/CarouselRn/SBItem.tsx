import React from 'react';
import type { StyleProp, ViewStyle, ViewProps, ImageSourcePropType } from 'react-native';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import type { AnimateProps } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { SBImageItem } from './SBImageItem';
import { SBTextItem } from './SBTextItem';

interface Props extends AnimateProps<ViewProps> {
  style?: StyleProp<ViewStyle>;
  index?: number;
  pretty?: boolean;
  showIndex?: boolean;
  img?: ImageSourcePropType;
  data: any;
}

export const SBItem: React.FC<Props> = (props) => {
  const { style, showIndex = true, index, pretty, img, testID, ...animatedViewProps } = props;
  const enablePretty = false;
  const [isPretty, setIsPretty] = React.useState(false);
  // console.log(props.data)

  return (
    <LongPressGestureHandler
      onActivated={() => {
        setIsPretty(!isPretty);
      }}
    >
      <Animated.View testID={testID} style={{ flex: 1 }} {...animatedViewProps}>
        {props.data ? (
          <SBImageItem
            data={props.data}
            style={style}
            index={index}
            showIndex={typeof index === 'number' && showIndex}
            img={img}
          />
        ) : (
          <SBTextItem style={style} index={index} />
        )}
      </Animated.View>
    </LongPressGestureHandler>
  );
};
