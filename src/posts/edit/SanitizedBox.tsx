import { Box, BoxProps } from '@mui/material';

export const SanitizedBox = (props: BoxProps & { fullWidth?: boolean }) => <Box {...props} />;
