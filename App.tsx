/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider';
import {StatusBar} from 'react-native';

import './global.css';
import {useColorScheme} from 'nativewind';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BootSplash from 'react-native-bootsplash';

import Stacks from '@/components/navigation/Stacks';

function App(): React.JSX.Element {
  const {colorScheme} = useColorScheme();

  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide({fade: true});
      }}>
      <GluestackUIProvider mode={colorScheme}>
        <SafeAreaProvider>
          <StatusBar
            barStyle={'light-content'}
            // backgroundColor={"orange"}
          />
          <GestureHandlerRootView style={{flex: 1}}>
            <Stacks />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </GluestackUIProvider>
    </NavigationContainer>
  );
}

export default App;
