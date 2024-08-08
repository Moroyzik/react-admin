import {
  Box,
  Card,
} from '@mui/material';
import {
  AutocompleteInput,
  CreateButton,
  DateInput,
  EditContextProvider,
  useEditController,
  ReferenceInput,
  SimpleForm,
  TextInput,
  Title,
  minLength,
  ShowButton,
  TopToolbar,
} from 'react-admin';

import { LinkToRelatedPost } from './LinkToRelatedPost.tsx';
import { OptionRenderer } from './OptionRenderer.tsx';
import { CreatePost } from './CreatePost.tsx';

const inputText = (record: { id: string; name: string; title: string; }) =>
  record.id === '@@ra-create'
    ? record.name
    : `${record.title} - ${record.id}`;

export const CommentEdit = (props: any) => {
  const controllerProps = useEditController(props);
  const { resource, record, save } = controllerProps;

  return (
    <EditContextProvider value={controllerProps}>
      <div className="edit-page">
        <Title defaultTitle={controllerProps.defaultTitle} />
        <Box sx={{ float: 'right' }}>
          <TopToolbar>
            <ShowButton record={record} />
            <CreateButton resource="posts" label="Create post" />
          </TopToolbar>
        </Box>
        <Card sx={{ marginTop: '1em', maxWidth: '30em' }}>
          {record && (
            <SimpleForm
              resource={resource}
              record={record}
              onSubmit={save}
              warnWhenUnsavedChanges
            >
              <TextInput
                source="id"
                InputProps={{ disabled: true }}
              />
              <ReferenceInput
                source="post_id"
                reference="posts"
                perPage={15}
                sort={{ field: 'title', order: 'ASC' }}
              >
                <AutocompleteInput
                  create={<CreatePost />}
                  matchSuggestion={(
                    filterValue,
                    suggestion
                  ) => {
                    const title = `${suggestion.title} - ${suggestion.id}`;
                    return title.includes(filterValue);
                  }}
                  optionText={<OptionRenderer />}
                  inputText={inputText}
                />
              </ReferenceInput>

              <LinkToRelatedPost />
              <TextInput
                source="author.name"
                validate={minLength(10)}
              />
              <DateInput source="created_at" />
              <TextInput
                source="body"
                validate={minLength(10)}
                multiline
              />
            </SimpleForm>
          )}
        </Card>
      </div>
    </EditContextProvider>
  );
};