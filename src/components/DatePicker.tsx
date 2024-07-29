import { View, Text } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { Button, ButtonText } from './ui/button';
import DatePicker from 'react-native-date-picker';
import { FormControl, FormControlLabel, FormControlLabelText } from './ui/form-control';

type Props = {
  openDatePicker: boolean;
  setOpenDatePicker: Dispatch<SetStateAction<boolean>>;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
};
const ExpireDatePicker = ({ openDatePicker, setOpenDatePicker, date, setDate }: Props) => {
  const stringDate = date.toDateString();
  return (
    <View className='w-full'>
      <FormControl>
        <FormControlLabel className="mb-1">
          <FormControlLabelText>Bid expiration date</FormControlLabelText>
        </FormControlLabel>
      </FormControl>
      <View className="w-full flex-col justify-center items-center gap-2 bg-gray-200">
        <Text className="text-2xl font-bold">{stringDate}</Text>
        <Button className="w-[150] h-16" onPress={() => setOpenDatePicker(true)}>
          <ButtonText>Pick date</ButtonText>
        </Button>
        <DatePicker
          modal
          open={openDatePicker}
          date={date}
          onConfirm={(date) => {
            setOpenDatePicker(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpenDatePicker(false);
          }}
          maximumDate={new Date('2024-12-31')}
          minimumDate={new Date()}
        />
      </View>
    </View>
  );
};

export default ExpireDatePicker;
