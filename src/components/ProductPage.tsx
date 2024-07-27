import React, { useMemo } from 'react';
import { Box } from './ui/box';
import { Text } from './ui/text';
import CarouselRn from './CarouselRn/CarouselRn';
import { images } from '@/data';
import { ScrollView } from 'react-native-gesture-handler';
import ScreenContainer from './ScreenContainer';
import CountDownTimer from './CountDownTimer';
import ThemedBtn from './ThemedBtn';
import colors from 'tailwindcss/colors';
import { timeDiffFromNow } from '@/helpers/functions';
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const ProductPage = ({ route }: any) => {
  const { id, endDate, lastBid, description } = route.params.item;
  const pics = Object.values(images);
  const timeLeft = useMemo(() => timeDiffFromNow(endDate), [endDate]) || timeDiffFromNow(endDate);
  const timeEnded = useMemo(
    () =>
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0,
    [endDate],
  );
  return (
    <ScreenContainer topBar={true}>
      <ScrollView style={{ flex: 1 }}>
        <Box style={{ flex: 1 }}>
          <CarouselRn pics={pics} />
          <Box className="p-4 flex flex-col justify-start items-start gap-4">
            <Text size="3xl" bold>{`Product ${id + 1}`}</Text>
            <Text className="text-lg">{description}</Text>
            <Box className="bg-background-200 p-3 rounded-md">
              <CountDownTimer endDate={endDate} textClassName="text-xl font-bold" />
              <Text className="mt-5 text-2xl flex items-center justify-center text-center">
                Last Bid:{' '}
                <Text style={{ color: colors.orange[500] }} className="text-xl font-bold">
                  {lastBid}{' '}
                </Text>
                $
              </Text>
            </Box>

            <ThemedBtn
              variant="solid"
              text={`Bid ${lastBid + 50}$`}
              className="rounded-full mt-5"
              textClassName="text-2xl"
              style={{ height: 50 }}
              isDisabled={timeEnded}
            />
          </Box>
        </Box>
      </ScrollView>
    </ScreenContainer>
  );
};

export default ProductPage;
