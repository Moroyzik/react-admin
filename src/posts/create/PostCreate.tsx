import { RichTextInput } from 'ra-input-rich-text';
import {
  ArrayInput,
  AutocompleteInput,
  BooleanInput,
  Create,
  DateInput,
  FileField,
  FileInput,
  FormDataConsumer,
  maxValue,
  minValue,
  NumberInput,
  required,
  ReferenceInput,
  SelectInput,
  SimpleFormConfigurable,
  SimpleFormIterator,
  TextInput,
  usePermissions,
} from 'react-admin';

import { PostCreateToolbar } from './PostCreateToolbar.tsx';
import { CreateUser } from './CreateUser.tsx';
import { DependantInput } from './DependantInput.tsx';

const backlinksDefaultValue = [
  {
    date: new Date(),
    url: 'http://google.com',
  },
];

const choiceList = [
  {
    id: 'headwriter',
    name: 'Head Writer',
  },
  {
    id: 'proofreader',
    name: 'Proof reader',
  },
  {
    id: 'cowriter',
    name: 'Co-Writer',
  },
]

const defaultValues = {
  average_note: 0,
}

export const PostCreate = () => {
  const { permissions } = usePermissions();

  const dateDefaultValue = new Date();

  return (
    <Create redirect="edit">
      <SimpleFormConfigurable
        toolbar={<PostCreateToolbar />}
        defaultValues={defaultValues}
        sx={{ maxWidth: { md: 'auto', lg: '30em' } }}
      >
        <FileInput
          source="pdffile"
          label="PDF-Template"
          accept={{ 'application/pdf': ['.pdf'] }}
        >
          <FileField source="src" title="title" />
        </FileInput>
        <TextInput
          autoFocus
          source="title"
          validate={required('Required field')}
        />
        <TextInput
          source="teaser"
          multiline
          validate={required('Required field')}
        />
        <RichTextInput source="body" fullWidth validate={required()} />
        <DependantInput dependency="title">
          <NumberInput
            source="average_note"
            validate={[
              minValue(0, 'Should be between 0 and 5'),
              maxValue(5, 'Should be between 0 and 5'),
            ]}
          />
        </DependantInput>

        <DateInput
          source="published_at"
          defaultValue={dateDefaultValue}
        />
        <BooleanInput source="commentable" defaultValue />
        <ArrayInput
          source="backlinks"
          defaultValue={backlinksDefaultValue}
          validate={[required()]}
        >
          <SimpleFormIterator>
            <DateInput source="date" defaultValue="" />
            <TextInput source="url" defaultValue="" />
          </SimpleFormIterator>
        </ArrayInput>
        {permissions === 'admin' && (
          <ArrayInput source="authors">
            <SimpleFormIterator>
              <ReferenceInput source="user_id" reference="users">
                <AutocompleteInput
                  label="User"
                  create={<CreateUser />}
                />
              </ReferenceInput>
              <FormDataConsumer>
                {({ scopedFormData }) =>
                  scopedFormData && scopedFormData.user_id ? (
                    <SelectInput
                      source="role"
                      choices={choiceList}
                      label="Role"
                    />
                  ) : null
                }
              </FormDataConsumer>
            </SimpleFormIterator>
          </ArrayInput>
        )}
      </SimpleFormConfigurable>
    </Create>
  );
};