import {
  Create,
  DateInput,
  TextInput,
  SimpleFormConfigurable,
  minLength,
} from 'react-admin';

import { PostReferenceInput } from '../components/PostReferenceInput/PostReferenctInput.tsx';

const now = new Date();

export const CommentCreate = () => (
  <Create redirect={false}>
    <SimpleFormConfigurable sx={{ maxWidth: { md: 'auto', lg: '30em' } }}>
      <PostReferenceInput />
      <TextInput source="author.name" validate={minLength(10)} />
      <DateInput source="created_at" defaultValue={now} />
      <TextInput source="body" multiline />
    </SimpleFormConfigurable>
  </Create>
);