import React, { useState, useEffect } from 'react';
import { Box } from './ui/box';
import { Text } from './ui/text';
import { timeDiffFromNow } from '@/helpers/functions';

const CountDownTimer = ({
  endDate,
  className,
  textClassName,
}: {
  endDate: string;
  className?: string;
  textClassName?: string;
}) => {
  const [timeLeft, setTimeLeft] = useState(timeDiffFromNow(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(timeDiffFromNow(endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <Box className={`mb-1 flex items-center justify-center gap-2 ${className}`}>
      {timeLeft.days !== 0 &&
      timeLeft.hours !== 0 &&
      timeLeft.minutes !== 0 &&
      timeLeft.seconds !== 0 ? (
        <>
          <Text
            className={`${textClassName}`}
          >{`${timeLeft.days} Days ${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds} Left`}</Text>
        </>
      ) : (
        <>
          <Text style={{ color: 'red' }} className={`${textClassName}`}>
            Ended!!!
          </Text>
        </>
      )}
    </Box>
  );
};

export default CountDownTimer;
