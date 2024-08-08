import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import { CommentCreate } from "./create/CommentCreate";
import { CommentEdit } from "./edit/CommentEdit";
import { CommentList } from "./list/CommentList";
import { CommentShow } from "./show/CommentShow";

export default {
  list: CommentList,
  create: CommentCreate,
  edit: CommentEdit,
  show: CommentShow,
  icon: ChatBubbleIcon,
};