import { useCreate, useCreateSuggestionContext } from 'react-admin';
import { Button, Dialog, DialogActions, DialogContent, TextField as MuiTextField } from '@mui/material';
import React from 'react';

export const CreatePost = () => {
  const { filter, onCancel, onCreate } = useCreateSuggestionContext();
  const [value, setValue] = React.useState(filter || '');
  const [create] = useCreate();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    create(
      'posts',
      {
        data: {
          title: value,
        },
      },
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
            label="New post title"
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