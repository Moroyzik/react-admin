import { useTranslate, useRecordContext } from 'react-admin';

export const PostTitle = () => {
  const translate = useTranslate();
  const record = useRecordContext();

  return (
    <>
      {record
        ? translate('post.edit.title', { title: record.title })
        : ''}
    </>
  );
};
