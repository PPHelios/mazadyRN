import FormControlGroup from '@/components/FormControlGroup';
import { Box } from '@/components/ui/box';
import React from 'react';

const SearchBox = () => {
  return (
    <Box>
      <FormControlGroup label="Search" placeholder="Search" helperText="Search for something" />
    </Box>
  );
};

export default SearchBox;
