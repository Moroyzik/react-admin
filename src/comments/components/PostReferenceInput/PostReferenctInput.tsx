import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ReferenceInput,
  SelectInput,
  useTranslate,
  required,
} from 'react-admin';

import { PostQuickCreate } from '../PostQuickCreate/PostQuickCreate';
import { PostPreview } from '../PostPreview/PostPreview';

export const PostReferenceInput = () => {
  const translate = useTranslate();

  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const postId = useWatch({ name: 'post_id' });

  const handleShowClick =
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      setShowPreviewDialog(true);
    }

  const handleCloseShow = () => {
    setShowPreviewDialog(false);
  }

  return (
    <>
      <ReferenceInput
        source="post_id"
        reference="posts"
        perPage={10000}
        sort={{ field: 'title', order: 'ASC' as const }}
      >
        <SelectInput
          create={<PostQuickCreate />}
          optionText="title"
          validate={required()}
        />
      </ReferenceInput>
      {postId ? (
        <>
          <Button
            data-testid="button-show-post"
            sx={{ margin: '10px 24px', position: 'relative' }}
            onClick={handleShowClick}
          >
            {translate('ra.action.show')}
          </Button>
          <Dialog
            data-testid="dialog-show-post"
            fullWidth
            open={showPreviewDialog}
            onClose={handleCloseShow}
            aria-label={translate('simple.create-post')}
          >
            <DialogTitle>
              {translate('simple.create-post')}
            </DialogTitle>
            <DialogContent>
              <PostPreview id={postId} resource="posts" />
            </DialogContent>
            <DialogActions>
              <Button
                data-testid="button-close-modal"
                onClick={handleCloseShow}
              >
                {translate('simple.action.close')}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : null}
    </>
  );
};