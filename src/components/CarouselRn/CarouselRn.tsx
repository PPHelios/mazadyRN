import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { SBItem } from './SBItem';
// import SButton from './SButton';
// import {ElementsText, window} from './constants';
import useScreenSize from '@/helpers/useScreenSize';
import { useColorScheme } from 'nativewind';

const colors = [
  '#26292E',
  '#899F9C',
  '#B3C680',
  '#5C6265',
  '#F5D399',
  '#F1F1F1',
  '#26292E',
  '#899F9C',
  '#B3C680',
  '#5C6265',
  '#F5D399',
  '#F1F1F1',
  '#5C6265',
  '#F5D399',
  '#F1F1F1',
];

function CarouselRn({ pics }: { pics: File[] }) {
  const [isVertical, setIsVertical] = React.useState(false);
  const [autoPlay, setAutoPlay] = React.useState(true);
  const [pagingEnabled, setPagingEnabled] = React.useState<boolean>(true);
  const [snapEnabled, setSnapEnabled] = React.useState<boolean>(true);
  const progressValue = useSharedValue<number>(0);
  const { height, width } = useScreenSize();
  let imageHeight = height / 3;
  if (imageHeight < 200) {
    imageHeight = 200;
  }
  // const baseOptions = isVertical
  //   ? ({
  //       vertical: true,
  //       width: PAGE_WIDTH * 0.86,
  //       height: PAGE_WIDTH * 0.6,
  //     } as const)
  //   : ({
  //       vertical: false,
  //       width: PAGE_WIDTH,
  //       height: PAGE_WIDTH * 0.6,
  //     } as const);
  const baseOptions = {
    vertical: false,
    width: width,
    height: imageHeight,
  } as const;
  const numberOfPics = pics.length;
  const paginationArr = colors.slice(0, numberOfPics);
  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
      <Carousel
        {...baseOptions}
        style={{
          width: width * 0.9,
        }}
        loop
        pagingEnabled={pagingEnabled}
        snapEnabled={snapEnabled}
        autoPlay={autoPlay}
        autoPlayInterval={3000}
        onProgressChange={(_, absoluteProgress) => (progressValue.value = absoluteProgress)}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 50,
        }}
        data={pics}
        renderItem={({ index }) => <SBItem index={index} data={pics[index]} />}
      />
      {!!progressValue && (
        <View
          style={
            isVertical
              ? {
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 10,
                  alignSelf: 'center',
                  position: 'absolute',
                  right: 5,
                  top: 40,
                }
              : {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 100,
                  alignSelf: 'center',
                  position: 'absolute',
                  top: imageHeight - 20,
                }
          }
        >
          {paginationArr.map((backgroundColor, index) => {
            return (
              <PaginationItem
                backgroundColor={backgroundColor}
                animValue={progressValue}
                index={index}
                key={index}
                isRotate={isVertical}
                length={paginationArr.length}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

const PaginationItem: React.FC<{
  index: number;
  backgroundColor: string;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
}> = (props) => {
  const { animValue, index, length, backgroundColor, isRotate } = props;
  const width = 10;
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(animValue?.value, inputRange, outputRange, Extrapolate.CLAMP),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? 'white' : 'gray',
        width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
        transform: [
          {
            rotateZ: isRotate ? '90deg' : '0deg',
          },
        ],
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default CarouselRn;
