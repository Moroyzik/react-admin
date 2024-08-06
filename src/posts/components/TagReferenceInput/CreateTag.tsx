import { useState } from 'react';
import { useCreate, useCreateSuggestionContext } from 'react-admin';
import { Button, Dialog, DialogActions, DialogContent, TextField as MuiTextField } from '@mui/material';


export const CreateTag = () => {
  const { filter, onCancel, onCreate } = useCreateSuggestionContext();
  const [value, setValue] = useState(filter || '');
  const [create] = useCreate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    create(
      'tags',
      { data: { name: { en: value } } },

      {
        onSuccess: data => {
          setValue('');
          const choice = data;
          onCreate(choice);
        },
      }
    );
    return false;
  };

  return (
    <Dialog open onClose={onCancel}>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <MuiTextField
            label="New tag"
            value={value}
            onChange={event => setValue(event.target.value)}
            autoFocus
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