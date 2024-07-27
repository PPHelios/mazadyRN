import type { PropsWithChildren } from 'react';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ThemedText from '../ThemedText';
export interface ISButtonProps {
  visible?: boolean;
  onPress?: () => void;
}

const SButton: React.FC<PropsWithChildren<ISButtonProps>> = (props) => {
  const { children, visible = true, onPress } = props;

  if (!visible) return <></>;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            marginTop: 20,
            backgroundColor: '#26292E',
            borderRadius: 50,
            paddingHorizontal: 20,
            padding: 10,
          }}
        >
          <ThemedText style={{ color: 'white' }}>{children}</ThemedText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SButton;
