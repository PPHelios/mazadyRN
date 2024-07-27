import React from 'react';
import { useColorScheme } from 'nativewind';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import ScreenContainer from '@/components/ScreenContainer';
import { ScrollView, TouchableOpacity } from 'react-native';
import { ChevronRight, FolderHeart, Globe, Mail, ShoppingCart, Star } from 'lucide-react-native';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from '@/components/ui/actionsheet';
import SignInBtns from '@/components/SignInBtns';

type Color = 'light' | 'dark';
const SettingsMain = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const handleColorChange = (color: Color) => {
    setShowColorsheet(false);
    setColorScheme(color);
  };
  const [showColorsheet, setShowColorsheet] = React.useState(false);
  const handleCloseColorsheet = () => setShowColorsheet(false);
  const isDarkMode = colorScheme === 'dark';
  return (
    <ScreenContainer topBar={true}>
      <ScrollView style={{ flex: 1 }}>
        <Box className="size-full justify-start items-stretch gap-3 pt-8 pb-44 px-6">
          <SignInBtns />
          <Text className="text-3xl mt-5 font-bold">Settings</Text>
          <OptionBtn
            title="Color scheme"
            isDarkMode={isDarkMode}
            onPress={() => setShowColorsheet(true)}
          >
            <ShoppingCart size={28} color={'white'} />
          </OptionBtn>
          <OptionBtn title="Change language" isDarkMode={isDarkMode}>
            <Globe size={28} color={'white'} />
          </OptionBtn>
          <OptionBtn title="Favorites" isDarkMode={isDarkMode}>
            <FolderHeart size={28} color={'white'} />
          </OptionBtn>
          <Text className="text-3xl font-bold mt-5">Mazady</Text>
          <OptionBtn title="Contact us" isDarkMode={isDarkMode}>
            <Mail size={28} color={'white'} />
          </OptionBtn>
          <OptionBtn title="Rate the app" isDarkMode={isDarkMode}>
            <Star size={28} color={'white'} />
          </OptionBtn>
          <OptionBtn title="Contact us" isDarkMode={isDarkMode}>
            <Mail size={28} color={'white'} />
          </OptionBtn>
          <OptionBtn title="Rate the app" isDarkMode={isDarkMode}>
            <Star size={28} color={'white'} />
          </OptionBtn>
        </Box>
      </ScrollView>
      <Actionsheet isOpen={showColorsheet} onClose={handleCloseColorsheet}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={() => handleColorChange('light')}>
            <ActionsheetItemText>Light</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={() => handleColorChange('dark')}>
            <ActionsheetItemText>Dark</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </ScreenContainer>
  );
};

const OptionBtn = ({
  children,
  title,
  isDarkMode,
  onPress,
}: {
  children: React.ReactNode;
  title: string;
  isDarkMode?: boolean;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box className="flex-row justify-between items-center px-4 bg-background-200 rounded-md ">
        <Box style={{ paddingVertical: 6 }} className=" flex-row justify-start items-center gap-8 ">
          <Box className="flex-row justify-center items-center p-3 rounded-full bg-orange-400">
            {children}
          </Box>
          <Text className="text-xl font-semibold">{title}</Text>
        </Box>
        <ChevronRight size={28} color={isDarkMode ? 'white' : 'black'} />
      </Box>
    </TouchableOpacity>
  );
};
export default SettingsMain;
