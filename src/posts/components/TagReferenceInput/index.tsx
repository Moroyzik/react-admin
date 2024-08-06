import { useState } from 'react';
import {
  AutocompleteArrayInput,
  ReferenceArrayInput,
  useLocaleState,
} from 'react-admin';
import {
  Box,
  Button,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { CreateTag } from './CreateTag.tsx';

type Props = {
  reference: string;
  source: string;
  label?: string;
}

export const TagReferenceInput = (props: Props) => {
  const { setValue } = useFormContext();
  const [published, setPublished] = useState(true);
  const [locale] = useLocaleState();

  const handleChangePublishedFilter = () => {
    setPublished((prev) => !prev);
    setValue('tags', []);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '50%',
      }}
    >
      <ReferenceArrayInput {...props} perPage={5} filter={{ published }}>
        <AutocompleteArrayInput
          create={<CreateTag />}
          optionText={`name.${locale}`}
        />
      </ReferenceArrayInput>
      <Button
        name="change-filter"
        onClick={handleChangePublishedFilter}
        sx={{ margin: '0 24px', position: 'relative' }}
      >
        Filter {published ? 'Unpublished' : 'Published'} Tags
      </Button>
    </Box>
  );
};