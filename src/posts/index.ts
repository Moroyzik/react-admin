import BookIcon from '@mui/icons-material/Book';

import { PostCreate } from './create/PostCreate.tsx';
import { PostList } from './list/PostList.tsx';
import { PostEdit } from './edit/PostEdit.tsx';
import { PostShow } from './show/PostShow.tsx';

export default {
  list: PostList,
  create: PostCreate,
  edit: PostEdit,
  show: PostShow,
  icon: BookIcon,
  recordRepresentation: 'title',
};