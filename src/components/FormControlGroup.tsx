import { View } from 'react-native';
import React from 'react';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from './ui/form-control';
import { Input, InputField } from './ui/input';
import { AlertCircleIcon } from 'lucide-react-native';
type Props = {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  helperText?: string;
  errorMsg?: string;
  ref?: any;
  disabled?: boolean;
  type?: 'text' | 'password' | undefined;
};
const FormControlGroup = ({
  ref,
  label,
  defaultValue,
  placeholder,
  helperText,
  errorMsg,
  disabled,
  type = 'text',
}: Props) => {
  return (
    <View>
      <FormControl isDisabled={disabled}>
        <FormControlLabel className="mb-1">
          <FormControlLabelText>{label}</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField ref={ref} type={type} defaultValue={defaultValue} placeholder={placeholder} />
        </Input>
        {helperText && (
          <FormControlHelper>
            <FormControlHelperText>{helperText}</FormControlHelperText>
          </FormControlHelper>
        )}
        {errorMsg && (
          <FormControlError>
            <FormControlErrorIcon size="md" as={AlertCircleIcon} />
            <FormControlErrorText>{errorMsg}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </View>
  );
};

export default FormControlGroup;
