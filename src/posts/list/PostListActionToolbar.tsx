import { Box } from '@mui/material';


export const PostListActionToolbar = ({ children }: { children: JSX.Element }) => (
  <Box sx={{ alignItems: 'center', display: 'flex' }}>{children}</Box>
);