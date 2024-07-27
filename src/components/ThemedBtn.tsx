import React from 'react';
import { Button, ButtonText, ButtonSpinner } from '@/components/ui/button';
import colors from 'tailwindcss/colors';
import { ViewProps } from 'react-native';

type Props = {
  className?: string;
  textClassName?: string;
  isDisabled?: boolean;
  loading?: boolean;
  variant?: 'solid' | 'outline' | 'link';
  onPress?: () => void;
  text?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewProps['style'];
};
const ThemedBtn = ({
  className,
  textClassName,
  isDisabled,
  loading = false,
  variant = 'solid',
  onPress,
  text,
  size,
  style,
}: Props) => {
  const styles = {
    outline: {
      borderColor: colors.orange[500],
    },
    solid: {
      borderColor: colors.orange[500],
      backgroundColor: isDisabled ? colors.gray[300] : colors.orange[500],
    },
    link: {},
  };
  return (
    <Button
      style={[styles[variant], style]}
      className={`${className}`}
      variant={variant}
      size={size}
      isDisabled={isDisabled}
      onPress={onPress}
    >
      {loading ? <ButtonSpinner /> : null}
      <ButtonText
        className={`${
          variant === 'solid' ? 'text-white dark:text-white' : 'text-black dark:text-white'
        } ${textClassName}`}
      >
        {text}
      </ButtonText>
    </Button>
  );
};
export default ThemedBtn;
