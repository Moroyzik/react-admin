import { useCreatePath, useRecordContext } from 'react-admin';
import { Link as RaLink } from 'ra-ui-materialui/dist/cjs/Link';
import { Typography } from '@mui/material';

export const LinkToRelatedPost = () => {
  const record = useRecordContext();
  const createPath = useCreatePath();
  return (
    <RaLink
      to={createPath({
        type: 'edit',
        resource: 'posts',
        id: record?.post_id,
      })}
    >
      <Typography variant="caption" color="inherit" align="right">
        See related post
      </Typography>
    </RaLink>
  );
};