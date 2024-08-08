import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  SaveButton,
  Form,
  TextInput,
  required,
  useCreate,
  useCreateSuggestionContext,
  useNotify,
  useTranslate,
} from 'react-admin';

import { PostQuickCreateCancelButton } from '../PostQuickCreateCancelButton/PostQuickCreateCancelButton';

type Props = {
  children?: React.ReactNode;
}

export const PostQuickCreate = (props: Props) => {
  const [create] = useCreate();
  const notify = useNotify();

  const { onCancel, onCreate } = useCreateSuggestionContext();
  const handleSave =
    (values: Partial<unknown>) => {
      create(
        'posts',
        { data: values },
        {
          onSuccess: data => {
            onCreate(data);
          },
          onError: (error: Error) => {
            notify(error.message, { type: 'error' });
          },
        }
      );
    }

  const translate = useTranslate();

  return (
    <Dialog
      data-testid="dialog-add-post"
      open
      fullWidth
      onClose={onCancel}
      aria-label={translate('simple.create-post')}
    >
      <Form onSubmit={handleSave} {...props}>
        <DialogTitle>{translate('simple.create-post')}</DialogTitle>
        <DialogContent>
          <TextInput
            defaultValue=""
            source="title"
            validate={required()}
          />
          <TextInput
            defaultValue=""
            source="teaser"
            validate={required()}
            multiline={true}
          />
        </DialogContent>
        <DialogActions>
          <SaveButton />
          <PostQuickCreateCancelButton onClick={onCancel} />
        </DialogActions>
      </Form>
    </Dialog>
  );
};