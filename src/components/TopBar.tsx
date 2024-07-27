import React from 'react';
import { ShoppingCart } from 'lucide-react-native';
import { Box } from './ui/box';
import { useColorScheme } from 'nativewind';
import colors from 'tailwindcss/colors';
import { Image } from 'react-native';

const TopBar = () => {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  return (
    <Box className="flex-row items-center justify-between p-4 bg-background-100 shadow-lg">
      <Image
        source={require('../../assets/images/mazady.gif')}
        style={{ width: 150, height: 40 }}
      />
      <ShoppingCart size={28} color={isDarkMode ? colors.orange[400] : colors.orange[500]} />
    </Box>
  );
};

export default TopBar;
