import { useRecordContext } from 'react-admin';


export const PostPanel = () => {
  const record = useRecordContext();

  return <div dangerouslySetInnerHTML={{ __html: record?.body }} />;
};