import {Theme, useMediaQuery} from '@mui/material';
import {ListActions, ListToolbar, Pagination, ReferenceInput, SearchInput, Title, useListContext} from 'react-admin';

import { CommentGrid } from './CommentGrid.tsx';
import { CommentMobileList } from './CommentMobileList.tsx';

const commentFilters = [
  <SearchInput source="q" alwaysOn />,
  <ReferenceInput source="post_id" reference="posts" />,
];

export const ListView = () => {
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
  const { defaultTitle } = useListContext();
  return (
    <>
      <Title defaultTitle={defaultTitle} />
      <ListToolbar filters={commentFilters} actions={<ListActions />} />
      {isSmall ? <CommentMobileList /> : <CommentGrid />}
      <Pagination rowsPerPageOptions={[6, 9, 12]} />
    </>
  );
};