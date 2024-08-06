import { CloneButton, useRecordContext } from 'react-admin';

export const CreateRelatedComment = () => {
  const record = useRecordContext();

  if (!record) {
    return null
  }

  return (
    <CloneButton
      resource="comments"
      label="Add comment"
      record={{ post_id: record.id }}
    />
  );
};