import { CloneButton, CreateButton, EditActionsProps, ShowButton, TopToolbar } from 'react-admin';

export const EditActions = ({ hasShow }: EditActionsProps) => (
  <TopToolbar>
    <CloneButton className="button-clone" />
    {hasShow && <ShowButton />}
    <CreateButton />
  </TopToolbar>
)