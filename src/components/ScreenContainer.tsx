import React from 'react';
import { Box } from './ui/box';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from './TopBar';

const ScreenContainer = ({ children, topBar }: { children: React.ReactNode; topBar?: boolean }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {topBar && <TopBar />}
      <Box className="size-full bg-background-0">{children}</Box>
    </SafeAreaView>
  );
};

export default ScreenContainer;
