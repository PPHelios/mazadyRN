import { View, Text, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '@/components/ScreenContainer';
import { ScrollView } from 'react-native-gesture-handler';
import { AlertCircleIcon } from 'lucide-react-native';
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
import { delayedResolve, toEnDigit } from '@/helpers/functions';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import ImagesUploader from '@/components/ImagesUploader';
import { ImageData } from '@/types/types';
import ExpireDatePicker from '@/components/DatePicker';
const addItemSchema = z
  .object({
    adTitle: z.string().trim().min(1, 'fieldRequired').min(6, 'fieldMin').max(20, 'fieldMax'),
    price: z.string().trim().min(1, 'fieldRequired').min(6, 'fieldMin').max(20, 'fieldMax'),
    description: z.string().trim().min(1, 'fieldRequired').min(6, 'fieldMin').max(20, 'fieldMax'),
  })
  .refine((data) => /^[0-9]*$/.test(data.price), {
    message: 'onlyNumbers',
    path: ['price'],
  })
  .refine((data) => Number(data.price) > 1, {
    message: 'fieldValueMin',
    path: ['price'],
  })
  .refine((data) => Number(data.price) < 1000000000, {
    message: 'fieldValueMax',
    path: ['price'],
  });

type addItemSchemaType = z.infer<typeof addItemSchema>;
const AddItem = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ImageData[]>([]);
  const [error, setGlobalError] = useState('');
  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<addItemSchemaType>({
    defaultValues: {
      adTitle: '',
      price: '',
      description: '',
    },
    resolver: zodResolver(addItemSchema),
  });

  const onSubmit = async (values: addItemSchemaType) => {
    setLoading(true);
    setGlobalError('');
    Keyboard.dismiss();
    try {
      const add = await delayedResolve();
      if (add) {
        setLoading(false);
        navigation.navigate("Home");
      }
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <ScreenContainer>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="always"
        automaticallyAdjustKeyboardInsets={true}
      >
        <View style={{ flex: 1 }} className="bg-background-0">
          <View
            style={{ marginTop: 40, marginBottom: 120 }}
            className="flex-col justify-center w-[96%] max-w-[500px] mx-auto gap-3"
          >
            <View>
              <Text className="text-4xl text-center">Add new item</Text>
            </View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormControl
                  className="mt-1"
                  isDisabled={loading}
                  isInvalid={Boolean(errors?.adTitle?.message)}
                >
                  <FormControlLabel className="mb-1">
                    <FormControlLabelText>First name</FormControlLabelText>
                  </FormControlLabel>
                  <Input className="h-16">
                    <InputField
                      type="text"
                      placeholder="Enter your first name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      className="h-16"
                      returnKeyType="next"
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorIcon size="md" as={AlertCircleIcon} />
                    <FormControlErrorText>{errors?.adTitle?.message}</FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
              name="adTitle"
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
                  isInvalid={Boolean(errors?.description?.message)}
                >
                  <FormControlLabel className="mb-1">
                    <FormControlLabelText>Description</FormControlLabelText>
                  </FormControlLabel>
                  <Textarea className="h-16">
                    <TextareaInput
                      type="text"
                      placeholder="Enter item description"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      className="h-16"
                      returnKeyType="next"
                    />
                  </Textarea>
                  <FormControlHelper>
                    <FormControlHelperText>
                      Item description from 10 to 2000 letters
                    </FormControlHelperText>
                  </FormControlHelper>
                  <FormControlError>
                    <FormControlErrorIcon size="md" as={AlertCircleIcon} />
                    <FormControlErrorText>{errors?.description?.message}</FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
              name="description"
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
                  isInvalid={Boolean(errors?.price?.message)}
                >
                  <FormControlLabel className="mb-1">
                    <FormControlLabelText>Price</FormControlLabelText>
                  </FormControlLabel>
                  <Input className="h-16">
                    <InputField
                      type="text"
                      placeholder="Enter items price"
                      onBlur={onBlur}
                      onChangeText={(val) => onChange(toEnDigit(val))}
                      value={value}
                      className="h-16"
                      keyboardType="numeric"
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorIcon size="md" as={AlertCircleIcon} />
                    <FormControlErrorText>{errors?.adTitle?.message}</FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
              name="price"
            />
            <View className="flex items-center justify-center gap-8">
              <ExpireDatePicker
                openDatePicker={openDatePicker}
                setOpenDatePicker={setOpenDatePicker}
                date={date}
                setDate={setDate}
              />

              <ImagesUploader
                images={images}
                setImages={setImages}
                setError={setGlobalError}
                loading={loading}
              />
            </View>
            <View>
              <FormControl isInvalid={Boolean(error)}>
                <FormControlError className="mb-1">
                  <FormControlErrorIcon size="md" as={AlertCircleIcon} />
                  <FormControlErrorText>{error}</FormControlErrorText>
                </FormControlError>
              </FormControl>
            </View>
            <Button
              disabled={loading}
              onPress={handleSubmit(onSubmit)}
              className="relative block h-16 w-full rounded-md
          bg-orange-600 text-white
          shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]
          dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            >
              {loading ? <ButtonSpinner className="bg-orange-600" /> : null}
              <ButtonText className="text-white text-xl">Add &rarr;</ButtonText>
            </Button>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AddItem;
