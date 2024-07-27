import React, { useMemo } from 'react';
import { Box } from '@/components/ui/box';
import CountDownTimer from '@/components/CountDownTimer';
import ThemedBtn from '@/components/ThemedBtn';
import { Text } from '@/components/ui/text';
import { Image, TouchableOpacity } from 'react-native';
import { images } from '@/data';
import colors from 'tailwindcss/colors';
import { Card } from '@/components/ui/card';
import { useNavigation } from '@react-navigation/native';
import { timeDiffFromNow } from '@/helpers/functions';
type Props = {
  id: number;
  title: string;
  image: string;
  link: string;
  endDate: string;
  lastBid: number;
  description: string;
  featured?: boolean;
};
const Product = ({ id, title, image, link, endDate, lastBid, description, featured }: Props) => {
  const img = images[image];
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();
  const timeLeft = useMemo(() => timeDiffFromNow(endDate), [endDate]) || timeDiffFromNow(endDate);
  const timeEnded = useMemo(
    () =>
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0,
    [endDate, timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds],
  );
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductPage', {
          item: { id, title, image, link, endDate, lastBid, description },
        })
      }
    >
      <Card
        variant="filled"
        key={title}
        style={{
          width: 189,
          height: 260,
          borderColor: featured ? colors.orange[500] : colors.slate[300],
          marginHorizontal: 10,
        }}
        className="flex h-full flex-col justify-between border p-2 rounded-xl"
      >
        <Box className="overflow-hidden">
          <Image
            source={img}
            style={{ width: '100%', height: 120 }}
            className="rounded-2xl object-cover"
          />
        </Box>
        <Box className="px-4 py-1">
          <Text size="xl" className=" text-left text-base font-bold">
            {`Product ${id + 1}`}
          </Text>
        </Box>
        <Box>
          <CountDownTimer
            endDate={endDate}
            className="mx-5 py-1"
            textClassName="text-md font-bold"
          />
        </Box>
        <Box className="flex flex-col gap-2 items-center justify-between px-5">
          <Text className="flex items-center justify-center text-center">
            Last Bid:{' '}
            <Text style={{ color: colors.orange[500] }} className="font-bold">
              {lastBid}
            </Text>
            $
          </Text>
          <ThemedBtn text={`Bid ${lastBid + 50}$`} isDisabled={timeEnded} />
        </Box>
      </Card>
    </TouchableOpacity>
  );
};

export default Product;
