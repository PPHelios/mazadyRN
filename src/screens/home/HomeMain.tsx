import { FlatList, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Box } from '@/components/ui/box';
import ScreenContainer from '@/components/ScreenContainer';
import { Search } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { projects } from '@/data';
import colors from 'tailwindcss/colors';
import { useColorScheme } from 'nativewind';
import { Text } from '@/components/ui/text';
import ThemedBtn from '@/components/ThemedBtn';
import CategoryItem from '@/components/CategoryItem';
import Product from '@/components/Product';

const HomeMain = () => {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  return (
    <ScreenContainer topBar={true}>
      <ScrollView style={{ flex: 1 }}>
        <Box className="size-full justify-start items-stretch gap-3 pt-8 pb-44 px-3">
          <TouchableOpacity onPress={() => navigation.navigate('SearchPage')}>
            <Box
              style={{
                borderColor: colors.orange[500],
              }}
              className="px-5 py-2 flex-row justify-start items-center rounded-full border-2"
            >
              <Search size={28} color={isDarkMode ? 'white' : colors.orange[500]} />
            </Box>
          </TouchableOpacity>
          <Text className="text-xl font-bold">Featured:</Text>
          <FlatList
            horizontal
            data={projects}
            renderItem={({ item }) => <Product key={item.link} {...item}  />}
            keyExtractor={(item) => item.title}
          />
          <Box style={{ backgroundColor: colors.blue[400] }} className=" w-full px-2 py-4 mt-5">
            <Text className="text-2xl text-bold text-black">No fakes. No fraud. No doubt.</Text>
            <Text className="text-black">
              Expand your collection confidently with Authenticity Guarantee
            </Text>
            <ThemedBtn
              variant="solid"
              text="Get Started"
              className="rounded-full mt-5"
              style={{ height: 50, width: 200 }}
            />
          </Box>
          <Text className="text-xl font-bold">Categories:</Text>
          <Box
            style={{ flexWrap: 'wrap' }}
            className="flex-row p-4 gap-2 justify-between items-center bg-background-200"
          >
            {projects.map((item) => (
              <CategoryItem key={item.link} {...item} />
            ))}
          </Box>
        </Box>
      </ScrollView>
    </ScreenContainer>
  );
};

export default HomeMain;
