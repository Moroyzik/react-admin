import { RichTextInput } from 'ra-input-rich-text';
import {
  AutocompleteInput,
  ArrayInput,
  BooleanInput,
  CheckboxGroupInput,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  ImageField,
  ImageInput,
  NumberInput,
  ReferenceManyField,
  ReferenceManyCount,
  ReferenceInput,
  SelectInput,
  SimpleFormIterator,
  TabbedForm,
  TextField,
  TextInput,
  minValue,
  number,
  required,
  FormDataConsumer,
  usePermissions,
} from 'react-admin';

import { PostTitle } from '../components/PostTitle';
import { TagReferenceInput } from '../components/TagReferenceInput';
import { CreateCategory } from './CreateCategory';
import { EditActions } from './EditActions';
import { SanitizedBox } from './SanitizedBox.tsx';

const categories = [
  { name: 'Tech', id: 'tech' },
  { name: 'Lifestyle', id: 'lifestyle' },
];

const choiceList = [
  { id: 12, name: 'Ray Hakt' },
  { id: 31, name: 'Ann Gullar' },
  { id: 42, name: 'Sean Phonee' },
]

export const PostEdit = () => {
  const { permissions } = usePermissions();

  return (
    <Edit title={<PostTitle />} actions={<EditActions />}>
      <TabbedForm
        defaultValues={{ average_note: 0 }}
        warnWhenUnsavedChanges
      >
        <TabbedForm.Tab label="post.form.summary">
          <SanitizedBox
            display="flex"
            flexDirection="column"
            width="100%"
            justifyContent="space-between"
            fullWidth
          >
            <TextInput
              InputProps={{ disabled: true }}
              source="id"
            />
            <TextInput
              source="title"
              validate={required()}
              resettable
            />
          </SanitizedBox>
          <TextInput
            multiline
            source="teaser"
            validate={required()}
            resettable
          />
          <CheckboxGroupInput
            source="notifications"
            choices={choiceList}
          />
          <ImageInput
            multiple
            source="pictures"
            accept={{ 'image/*': ['.jpeg', '.png', '.jpg'] }}
            helperText=""
          >
            <ImageField source="src" title="title" />
          </ImageInput>
          {permissions === 'admin' && (
            <ArrayInput source="authors">
              <SimpleFormIterator inline>
                <ReferenceInput
                  source="user_id"
                  reference="users"
                >
                  <AutocompleteInput helperText={false} />
                </ReferenceInput>
                <FormDataConsumer>
                  {({ scopedFormData }) =>
                    scopedFormData &&
                    scopedFormData.user_id ? (
                      <SelectInput
                        source="source"
                        choices={[
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
                        ]}
                        helperText={false}
                      />
                    ) : null
                  }
                </FormDataConsumer>
              </SimpleFormIterator>
            </ArrayInput>
          )}
        </TabbedForm.Tab>
        <TabbedForm.Tab label="post.form.body">
          <RichTextInput
            source="body"
            label={false}
            validate={required()}
            fullWidth
          />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="post.form.miscellaneous">
          <TagReferenceInput
            reference="tags"
            source="tags"
            label="Tags"
          />
          <ArrayInput source="backlinks">
            <SimpleFormIterator>
              <DateInput source="date" />
              <TextInput source="url" validate={required()} />
            </SimpleFormIterator>
          </ArrayInput>
          <DateInput source="published_at" />
          <SelectInput
            create={
              <CreateCategory
                onAddChoice={(choice) => categories.push(choice)}
              />
            }
            resettable
            source="category"
            choices={categories}
          />
          <NumberInput
            source="average_note"
            validate={[required(), number(), minValue(0)]}
          />
          <BooleanInput source="commentable" defaultValue />
          <TextInput InputProps={{ disabled: true }} source="views" />
          <ArrayInput source="pictures">
            <SimpleFormIterator>
              <TextInput source="url" defaultValue="" />
              <ArrayInput source="metas.authors">
                <SimpleFormIterator>
                  <TextInput source="name" defaultValue="" />
                </SimpleFormIterator>
              </ArrayInput>
            </SimpleFormIterator>
          </ArrayInput>
        </TabbedForm.Tab>
        <TabbedForm.Tab
          label="post.form.comments"
          count={
            <ReferenceManyCount
              reference="comments"
              target="post_id"
              sx={{ lineHeight: 'inherit' }}
            />
          }
        >
          <ReferenceManyField reference="comments" target="post_id">
            <Datagrid>
              <DateField source="created_at" />
              <TextField source="author.name" />
              <TextField source="body" />
              <EditButton />
            </Datagrid>
          </ReferenceManyField>
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};