import React from 'react';
import ScreenContainer from './ScreenContainer';
import { Box } from './ui/box';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from './ui/text';
import { images, projects } from '@/data';
import { FlatList, ImageBackground } from 'react-native';
import Product from './Product';
import colors from 'tailwindcss/colors';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const CategoryPage = ({ route }: any) => {
  const { category, image } = route.params;
  const img = images[image];
  return (
    <ScreenContainer>
      <ScrollView style={{ flex: 1 }}>
        <Box className="py-4 flex flex-col gap-14 justify-start items-center">
          <ImageBackground
            source={img}
            style={{ width: '100%', height: 170, backgroundColor: 'red' }}
            className="flex justify-center items-center size-full rounded-full object-cover"
          >
            <Text style={{ color: colors.orange[500],backgroundColor: 'rgba(0,0,0,0.5)' }} className="text-5xl font-bold p-5 rounded-full">
              {category}
            </Text>
          </ImageBackground>
          <FlatList
            contentContainerStyle={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
            }}
            numColumns={2}
            scrollEnabled={false}
            data={projects}
            renderItem={({ item }) => <Product key={item.link} {...item} />}
            ItemSeparatorComponent={() => <Box className="px-4" />}
            keyExtractor={(item) => item.title}
          />
        </Box>
      </ScrollView>
    </ScreenContainer>
  );
};

export default CategoryPage;
