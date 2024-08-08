import jsonExport from 'jsonexport/dist';
import {
  ListBase,
  downloadCSV,
  Exporter,
} from 'react-admin';

import { ListView } from './ListView.tsx';

const exporter: Exporter = (records, fetchRelatedRecords) =>
  fetchRelatedRecords(records, 'post_id', 'posts').then(posts => {
    const data = records.map(record => {
      const { author, ...recordForExport } = record; // omit author
      recordForExport.author_name = author.name;
      recordForExport.post_title = posts[record.post_id].title;
      return recordForExport;
    });
    const headers = [
      'id',
      'author_name',
      'post_id',
      'post_title',
      'created_at',
      'body',
    ];

    return jsonExport(data, { headers }, (error, csv) => {
      if (error) {
        console.error(error);
      }
      downloadCSV(csv, 'comments');
    });
  });





export const CommentList = () => (
  <ListBase perPage={6} exporter={exporter}>
    <ListView />
  </ListBase>
);