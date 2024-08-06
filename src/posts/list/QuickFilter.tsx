import { useTranslate } from 'react-admin';
import { Chip } from '@mui/material';

type Props = {
  label: string;
  source?: string;
  defaultValue?: boolean;
}

export const QuickFilter = ({ label }: Props) => {
  const translate = useTranslate();

  return <Chip sx={{ marginBottom: 1 }} label={translate(label)} />;
};