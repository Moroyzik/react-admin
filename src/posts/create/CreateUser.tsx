import { AutocompleteInput, required, TextInput, useCreate, useCreateSuggestionContext } from 'react-admin';
import { FormEvent, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';

const choiceList = [
  { id: '', name: 'None' },
  { id: 'admin', name: 'Admin' },
  { id: 'user', name: 'User' },
  { id: 'user_simple', name: 'UserSimple' },
]

export const CreateUser = () => {
  const { filter, onCancel, onCreate } = useCreateSuggestionContext();
  const [value, setValue] = useState(filter || '');
  const [create] = useCreate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    create(
      'users',
      {
        data: {
          name: value,
        },
      },
      {
        onSuccess: data => {
          setValue('');
          onCreate(data);
        },
      }
    );
  };

  return (
    <Dialog open onClose={onCancel}>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextInput
            source="name"
            defaultValue="Slim Shady"
            autoFocus
            validate={[required()]}
          />
          <AutocompleteInput
            source="role"
            choices={choiceList}
            validate={[required()]}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};