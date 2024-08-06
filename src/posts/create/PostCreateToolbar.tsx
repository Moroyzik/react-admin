import { SaveButton, Toolbar, useNotify, useRedirect } from 'react-admin';
import { useFormContext } from 'react-hook-form';


export const PostCreateToolbar = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const { reset } = useFormContext();

  return (
    <Toolbar>
      <SaveButton label="post.action.save_and_edit" variant="text" />
      <SaveButton
        label="post.action.save_and_show"
        type="button"
        variant="text"
        mutationOptions={{
          onSuccess: (data) => {
            notify('ra.notification.created', {
              type: 'info',
              messageArgs: { smart_count: 1 },
            });
            redirect('show', 'posts', data.id);
          },
        }}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      />
      <SaveButton
        label="post.action.save_and_add"
        type="button"
        variant="text"
        mutationOptions={{
          onSuccess: () => {
            reset();
            window.scrollTo(0, 0);
            notify('ra.notification.created', {
              type: 'info',
              messageArgs: { smart_count: 1 },
            });
          },
        }}
      />
      <SaveButton
        label="post.action.save_with_average_note"
        type="button"
        variant="text"
        mutationOptions={{
          onSuccess: data => {
            notify('ra.notification.created', {
              type: 'info',
              messageArgs: { smart_count: 1 },
            });
            redirect('show', 'posts', data.id);
          },
        }}
        transform={data => ({ ...data, average_note: 10 })}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      />
    </Toolbar>
  );
};