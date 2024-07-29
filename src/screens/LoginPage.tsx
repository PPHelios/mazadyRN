import { Text } from '@/components/ui/text';
import React, { useRef, useState } from 'react';
import { Keyboard, Pressable, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PhoneInput, { ICountry } from 'react-native-international-phone-number';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '@/components/ScreenContainer';
import { ScrollView } from 'react-native-gesture-handler';
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from 'lucide-react-native';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { useColorScheme } from 'nativewind';
import { delayedResolve, toEnDigit } from '@/helpers/functions';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Image } from 'react-native';
import colors from 'tailwindcss/colors';
const signInSchema = z.object({
  phoneNumber: z.coerce.string().trim().min(1).min(5).max(20),
  password: z.string().trim().min(6).max(20),
});

type SignInSchemaType = z.infer<typeof signInSchema>;
const LoginPage = () => {
  const [selectedCountry, setSelectedCountry] = useState<undefined | ICountry>(undefined);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setGlobalError] = useState('');
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const passwordRef = useRef<any>();
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  const onSubmit = async (values: SignInSchemaType) => {
    setLoading(true);
    setGlobalError('');
    Keyboard.dismiss();
    try {
      const countryCode = `${selectedCountry?.callingCode.replace(/[\s+]/g, '').trim()}`;
      const phoneNumber = `${values.phoneNumber.replace(/[\s+]/g, '').trim()}`;
      if (
        countryCode === '20' &&
        ((phoneNumber[0] === '0' && phoneNumber.length !== 11) ||
          phoneNumber.length < 10 ||
          phoneNumber.length > 11)
      ) {
        setError('phoneNumber', { type: 'custom', message: 'notValidPhone' });
        setLoading(false);
        return;
      }
      const fullNumber = String(
        countryCode.concat(
          countryCode === '20' && phoneNumber[0] === '0' ? phoneNumber.slice(1) : phoneNumber,
        ),
      );

      // const transValues = { fullNumber, password: values.password.trim() };
      const login = await delayedResolve();
      if (login) {
        setLoading(false);
        Keyboard.dismiss();
        navigation.goBack();
      }
    } catch (err: any) {
      setLoading(false);
      setGlobalError(err.message);
    }
  };
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    defaultValues: {
      phoneNumber: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  });
  return (
    <ScreenContainer>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="always"
        automaticallyAdjustKeyboardInsets={true}
      >
        <View style={{ flex: 1 }} className="bg-background-0">
          <View style={{ marginVertical: 40 }} className="flex-row items-center justify-center">
            <Image
              source={require('../../assets/images/mazady.gif')}
              style={{ width: 280, height: 100 }}
            />
          </View>
          <View className="w-[96%] max-w-[500px] mx-auto flex-col justify-center gap-14">
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { onChange, value } }) => (
                <View>
                  <PhoneInput
                    value={value}
                    onChangePhoneNumber={(value) => onChange(toEnDigit(value))}
                    selectedCountry={selectedCountry}
                    onChangeSelectedCountry={(country) => setSelectedCountry(country)}
                    theme={isDarkMode ? 'dark' : 'light'}
                    defaultCountry="EG"
                    disabled={loading}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    returnKeyType="next"
                    autoFocus={true}
                    blurOnSubmit={false}
                    phoneInputStyles={{
                      flagContainer: { width: 120 },
                      input: {
                        fontSize: 15,
                      },
                    }}
                    modalStyles={{
                      searchInput: {
                        color: isDarkMode ? 'white' : 'black',
                      },
                      callingCode: {
                        fontSize: 16,
                        // fontWeight: 'bold',
                        color: isDarkMode ? 'white' : 'black',
                      },
                      countryName: {
                        fontSize: 16,
                        // fontWeight: 'bold',
                        color: isDarkMode ? 'white' : 'black',
                      },
                    }}
                  />
                  <FormControl isInvalid={Boolean(errors?.phoneNumber?.message)}>
                    <FormControlError>
                      <FormControlErrorIcon size="md" as={AlertCircleIcon} />
                      <FormControlErrorText>{errors?.phoneNumber?.message}</FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                </View>
              )}
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormControl
                  className="mt-1"
                  isDisabled={loading}
                  isInvalid={Boolean(errors?.password?.message)}
                >
                  <FormControlLabel className="mb-1">
                    <FormControlLabelText>Password</FormControlLabelText>
                  </FormControlLabel>
                  <Input className="h-16">
                    <InputField
                      ref={passwordRef}
                      type="password"
                      placeholder="Enter your password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      onSubmitEditing={handleSubmit(onSubmit)}
                      className="h-16"
                      returnKeyType="done"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />
                    <InputSlot className="px-5" onPress={() => setShowPassword(!showPassword)}>
                      <InputIcon>
                        {showPassword ? (
                          <EyeOffIcon size={20} color={isDarkMode ? 'white' : 'black'} />
                        ) : (
                          <EyeIcon size={20} color={isDarkMode ? 'white' : 'black'} />
                        )}
                      </InputIcon>
                    </InputSlot>
                  </Input>
                  <FormControlHelper>
                    <FormControlHelperText>Must be at least 6 characters.</FormControlHelperText>
                  </FormControlHelper>
                  <FormControlError>
                    <FormControlErrorIcon size="md" as={AlertCircleIcon} />
                    <FormControlErrorText>{errors?.password?.message}</FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
              name="password"
            />
            <View>
              <Pressable
                disabled={loading}
                onPress={() => {
                  navigation.navigate('SignupPage');
                }}
              >
                {({ pressed }) => (
                  <Text
                    size="lg"
                    style={{
                      opacity: pressed ? 0.5 : 1,
                      color: colors.orange[500],
                      marginStart: 'auto',
                    }}
                  >
                    Don&apos;t have an account ? Sign up
                  </Text>
                )}
              </Pressable>
            </View>
            <View>
              <FormControl isInvalid={Boolean(error)}>
                <FormControlError className="mb-1">
                  <FormControlErrorIcon size="md" as={AlertCircleIcon} />
                  <FormControlErrorText>{error}</FormControlErrorText>
                </FormControlError>
              </FormControl>
              <Button
                disabled={loading}
                onPress={handleSubmit(onSubmit)}
                className="group/btn relative block h-16 w-full rounded-md
            bg-orange-600 text-white
            shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]
            dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              >
                {loading ? <ButtonSpinner className="bg-orange-600" /> : null}
                <ButtonText className="text-white text-xl">Login &rarr;</ButtonText>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default LoginPage;
