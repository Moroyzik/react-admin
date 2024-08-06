import { useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';

import { PostListMobile } from './PostListMobile.tsx';
import { PostListDesktop } from './PostListDesktop.tsx';

export const PostList = () => {
  const isSmall = useMediaQuery<Theme>(
    theme => theme.breakpoints.down('md'),
    { noSsr: true }
  );
  return isSmall ? <PostListMobile /> : <PostListDesktop />;
};