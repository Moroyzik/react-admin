import { CreateButton, ExportButton, FilterButton, InfiniteList, SimpleList, TopToolbar } from 'react-admin';

import { exporter, postFilter } from './constants.tsx';

const postListMobileActions = (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const PostListMobile = () => (
  <InfiniteList
    filters={postFilter}
    sort={{ field: 'published_at', order: 'DESC' }}
    exporter={exporter}
    actions={postListMobileActions}
  >
    <SimpleList
      primaryText={record => record.title}
      secondaryText={record => `${record.views} views`}
      tertiaryText={record =>
        new Date(record.published_at).toLocaleDateString()
      }
    />
  </InfiniteList>
);