import * as React from 'react';
import { useCreateSuggestionContext } from 'react-admin';
import { Button, Dialog, DialogActions, DialogContent, TextField as MuiTextField } from '@mui/material';


export type Props = {
  onAddChoice: (record: { name: string, id: string }) => void;
}

export const CreateCategory = ({ onAddChoice }: Props) => {
  const { filter, onCancel, onCreate } = useCreateSuggestionContext();
  const [value, setValue] = React.useState(filter || '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const choice = { name: value, id: value.toLowerCase() };
    onAddChoice(choice);
    onCreate(choice);
    setValue('');
    return false;
  };

  return (
    <Dialog open onClose={onCancel}>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <MuiTextField
            label="New Category"
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