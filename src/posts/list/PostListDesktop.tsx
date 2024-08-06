import {
  BooleanField, BulkDeleteButton, BulkExportButton, ChipField, CreateButton, DatagridConfigurable,
  DateField, EditButton, ExportButton, FilterButton, Identifier,
  List,
  NumberField, RaRecord,
  ReferenceArrayField,
  ReferenceManyCount, SelectColumnsButton, ShowButton, SingleFieldList,
  TextField, TopToolbar
} from 'react-admin';
import { styled } from '@mui/material/styles';

import { ResetViewsButton } from './ResetViewsButton.tsx';
import { PostListActionToolbar } from './PostListActionToolbar.tsx';
import { PostPanel } from './PostPanel.tsx';
import { exporter, postFilter } from './constants.tsx';


const tagSort = { field: 'name.en', order: 'ASC' } as const;

const rowClick = (_id: Identifier, _: string, record: RaRecord) => {
  if (record.commentable) {
    return 'edit';
  }

  return 'show';
};

const postListBulkActions = (
  <>
    <ResetViewsButton />
    <BulkDeleteButton />
    <BulkExportButton />
  </>
);

const postListActions = (
  <TopToolbar>
    <SelectColumnsButton />
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const StyledDatagrid = styled(DatagridConfigurable)(({ theme }) => ({
  '& .title': {
    maxWidth: '16em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  '& .hiddenOnSmallScreens': {
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  '& .column-tags': {
    minWidth: '9em',
  },
  '& .publishedAt': { fontStyle: 'italic' },
}));

export const PostListDesktop = () => (
  <List
    filters={postFilter}
    sort={{ field: 'published_at', order: 'DESC' }}
    exporter={exporter}
    actions={postListActions}
  >
    <StyledDatagrid
      bulkActionButtons={postListBulkActions}
      rowClick={rowClick}
      expand={PostPanel}
      omit={['average_note']}
    >
      <TextField source="id" />
      <TextField source="title" cellClassName="title" />
      <DateField
        source="published_at"
        sortByOrder="DESC"
        cellClassName="publishedAt"
      />
      <ReferenceManyCount
        label="resources.posts.fields.nb_comments"
        reference="comments"
        target="post_id"
        link
      />
      <BooleanField
        source="commentable"
        label="resources.posts.fields.commentable_short"
        sortable={false}
      />
      <NumberField source="views" sortByOrder="DESC" />
      <ReferenceArrayField
        label="Tags"
        reference="tags"
        source="tags"
        sortBy="tags.name"
        sort={tagSort}
        cellClassName="hiddenOnSmallScreens"
        headerClassName="hiddenOnSmallScreens"
      >
        <SingleFieldList>
          <ChipField clickable source="name.en" size="small" />
        </SingleFieldList>
      </ReferenceArrayField>
      <NumberField source="average_note" />
      <PostListActionToolbar>
        <>
          <EditButton />
          <ShowButton />
        </>
      </PostListActionToolbar>
    </StyledDatagrid>
  </List>
);