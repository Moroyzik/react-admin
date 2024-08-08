import { useQueryClient } from '@tanstack/react-query';
import {
  SimpleShowLayout,
  TextField,
  ResourceContextProvider,
  Identifier,
  RaRecord,
} from 'react-admin'

type Props = {
  id: Identifier;
  resource: string;
}

export const PostPreview = <RecordType extends RaRecord>({ id, resource }: Props) => {
  const queryClient = useQueryClient();
  const record = queryClient.getQueryData<RecordType>([
    resource,
    'getOne',
    { id: String(id) },
  ]);

  return (
    <ResourceContextProvider value={resource}>
      <SimpleShowLayout record={record}>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="teaser" />
      </SimpleShowLayout>
    </ResourceContextProvider>
  );
};