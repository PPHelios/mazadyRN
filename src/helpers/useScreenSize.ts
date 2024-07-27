import { useWindowDimensions } from 'react-native';

const useScreenSize = () => {
  const { height, width } = useWindowDimensions();
  const isSmallScreen = width <= 415;
  const isLargeScreen = width > 415 && width <= 768;
  const isTablet = width >= 768;
  const COL = 3;
  const MARGIN = 8;
  let factor = 10;
  if (width <= 360) {
    factor = 15;
  }
  const ImageSize = width / COL - MARGIN - factor;
  // const isDesktop = width > 1024;
  return {
    height,
    width,
    isSmallScreen,
    isLargeScreen,
    isTablet,
    ImageSize,
  };
};

export default useScreenSize;
