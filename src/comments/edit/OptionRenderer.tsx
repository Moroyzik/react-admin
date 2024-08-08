import { useRecordContext } from 'react-admin';

export const OptionRenderer = (props: any) => {
  const record = useRecordContext();
  if (!record) return null;

  return record.id === '@@ra-create' ? (
    <div {...props}>{record.name}</div>
  ) : (
    <div {...props}>
      {record?.title} - {record?.id}
    </div>
  );
};