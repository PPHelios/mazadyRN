import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Image, TouchableOpacity } from 'react-native';
import { images } from '@/data';
import { Card } from '@/components/ui/card';
import { useNavigation } from '@react-navigation/native';
type Props = {
  id: number;
  title: string;
  image: string;
  link: string;
  endDate: string;
  lastBid: number;
  description: string;
};
const CategoryItem = ({ title, image }: Props) => {
  const img = images[image];
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CategoryPage', {
          category: title,
          image
        })
      }
    >
      <Card
        variant="filled"
        key={title}
        style={{ width: 120, height: 180 }}
        className="flex flex-col justify-center items-center gap-4  p-2 rounded-xl"
      >
        <Box className="overflow-hidden">
          <Image
            source={img}
            style={{ width: 100, height: 100 }}
            className="rounded-full object-cover"
          />
        </Box>
        <Box className="px-4 py-1">
          <Text size="xl" className=" text-center text-base font-bold">
            {title}
          </Text>
        </Box>
      </Card>
    </TouchableOpacity>
  );
};

export default CategoryItem;
