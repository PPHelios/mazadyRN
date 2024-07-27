import React from 'react';
import { Box } from './ui/box';
import ThemedBtn from '@/components/ThemedBtn';
import { useNavigation } from '@react-navigation/native';

const SignInBtns = () => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const navigation = useNavigation<any>();
  return (
    <Box className="flex-row gap-8 justify-center items-center">
      <ThemedBtn text="Sign in" variant="outline" size="xl" onPress={() => navigation.navigate('LoginPage')} />
      <ThemedBtn text="Register" variant="outline" size="xl" onPress={() => navigation.navigate('SignupPage')}/>
    </Box>
  );
};

export default SignInBtns;
