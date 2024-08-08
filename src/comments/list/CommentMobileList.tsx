import {SimpleList} from 'react-admin';
import PersonIcon from '@mui/icons-material/Person';

export const CommentMobileList = () => (
  <SimpleList
    primaryText={record => record.author.name}
    secondaryText={record => record.body}
    tertiaryText={record =>
      new Date(record.created_at).toLocaleDateString()
    }
    leftAvatar={() => <PersonIcon />}
  />
);