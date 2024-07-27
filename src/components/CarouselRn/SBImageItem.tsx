import React from 'react';
import type { StyleProp, ViewStyle, ImageURISource, ImageSourcePropType } from 'react-native';
import { StyleSheet, View, Image } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  index?: number;
  showIndex?: boolean;
  img?: ImageSourcePropType;
  data: any;
}

export const SBImageItem: React.FC<Props> = ({
  style,
  index: _index,
  showIndex = true,
  img,
  data,
}) => {
  const index = _index ?? 0;
  const imgUrl = data;
  const source = React.useRef<ImageURISource>({
    uri: imgUrl,
  }).current;
  // console.log(data)
  return (
    <View style={[styles.container]}>
      <Image key={index} style={styles.image} source={data} />
      {/* {
        showIndex && <Text
          style={{
            position: "absolute",
            color: "#6E6E6E",
            fontSize: 40,
            backgroundColor: "#EAEAEA",
            borderRadius: 5,
            overflow: "hidden",
            paddingHorizontal: 10,
            paddingTop: 2,
          }}
        >
          {index}
        </Text>
      } */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(186, 147, 147, 0.13)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    objectFit: 'cover',
    borderRadius: 8,
    overflow: 'hidden',
    // backgroundColor: 'rgba(186, 147, 147, 0.13)',
  },
});
