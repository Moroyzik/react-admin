import { downloadCSV, Exporter, SearchInput, TextInput } from 'react-admin';
import lodashGet from 'lodash/get';
import jsonExport from 'jsonexport/dist';

import { QuickFilter } from './QuickFilter.tsx';


export const postFilter = [
  <SearchInput source="q" alwaysOn />,
  <TextInput source="title" defaultValue="Qui tempore rerum et voluptates" />,
  <QuickFilter
    label="resources.posts.fields.commentable"
    source="commentable"
    defaultValue
  />,
];

export const exporter: Exporter<{ id: string; backlinks: { url: string }[] }> = (posts) => {
  const data = posts.map((post) => ({
    ...post,
    backlinks: lodashGet(post, 'backlinks', []).map(
      (backlink) => backlink.url
    ),
  }));
  return jsonExport(data, (_err: Error, csv: string) => downloadCSV(csv, 'posts'));
};