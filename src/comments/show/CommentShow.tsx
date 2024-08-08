import {
  DateField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin';

export const CommentShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <ReferenceField source="post_id" reference="posts">
        <TextField source="title" />
      </ReferenceField>
      <TextField source="author.name" />
      <DateField source="created_at" />
      <TextField source="body" />
    </SimpleShowLayout>
  </Show>
);