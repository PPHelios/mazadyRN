import Product from '@/components/Product';
import ScreenContainer from '@/components/ScreenContainer';
import { Box } from '@/components/ui/box';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { projects } from '@/data';
import { ItemProps } from '@/types/types';
import { Search } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native';
import colors from 'tailwindcss/colors';

const SearchPage = () => {
  const [text, setText] = React.useState('');
  const [inputFocused, setInputFocused] = React.useState(false);
  const [results, setResults] = React.useState<ItemProps[]>([]);
  useEffect(() => {
    const result = projects.filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));
    setResults(result);
  }, [text]);
  return (
    <ScreenContainer topBar={false}>
      <ScrollView style={{ flex: 1 }}>
        <Box className="justify-start items-center gap-8 pt-8 pb-44 px-6">
          <Box className="w-full mx-auto max-w-[500px]  flex justify-start gap-2">
            <Input
              style={{
                borderColor: inputFocused ? colors.orange[700] : colors.orange[500],
              }}
              className="w-full h-16 rounded-full "
            >
              <InputField
                placeholder="Search on Mazady"
                onFocus={() => setInputFocused(true)}
                onBlur={() => {
                  if (text === '') {
                    setInputFocused(false);
                  }
                }}
                value={text}
                onChangeText={setText}
              />
            </Input>
            {inputFocused && results.length > 0 && (
              <FlatList
                // scrollEnabled={false}
                data={results}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      console.log(item.link);
                      setText(item.link);
                      setInputFocused(false);
                    }}
                  >
                    <Text style={{ width: '100%' }} className="text-lg h-12">
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                )}
                style={{
                  width: '80%',
                  marginHorizontal: 'auto',
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                  maxHeight: 100,
                  overflow:"scroll"
                }}
              />
            )}
          </Box>
          <Box className="flex-col justify-center items-center gap-2">
            {text === '' ? (
              <Box className="flex-col justify-center items-center gap-3">
                <Search size={48} color={colors.orange[500]} />
                <Text bold size="3xl">
                  Search on Mazady
                </Text>
                <Text size="sm">Find your next favorite thing</Text>
              </Box>
            ) : (
              <FlatList
                contentContainerStyle={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 20,
                }}
                numColumns={2}
                scrollEnabled={false}
                data={results}
                renderItem={({ item }) => <Product key={item.link} {...item} />}
                ItemSeparatorComponent={() => <Box className="px-4" />}
                keyExtractor={(item) => item.title}
              />
            )}
          </Box>
        </Box>
      </ScrollView>
    </ScreenContainer>
  );
};

export default SearchPage;
