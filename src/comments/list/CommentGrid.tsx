import { DateField, EditButton, ReferenceField, ShowButton, TextField, useListContext, useTranslate } from 'react-admin';
import { Avatar, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

export const CommentGrid = () => {
  const { data } = useListContext();
  const translate = useTranslate();

  if (!data) return null;
  return (
    <Grid spacing={2} container>
      {data.map(record => (
        <Grid item key={record.id} sm={12} md={6} lg={4}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardHeader
              className="comment"
              title={
                <TextField
                  record={record}
                  source="author.name"
                />
              }
              subheader={
                <DateField
                  record={record}
                  source="created_at"
                />
              }
              avatar={
                <Avatar>
                  <PersonIcon />
                </Avatar>
              }
            />
            <CardContent>
              <TextField
                record={record}
                source="body"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              />
            </CardContent>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                component="span"
                variant="body2"
                data-testid="postLink"
              >
                {translate('comment.list.about')}&nbsp;
              </Typography>
              <ReferenceField
                record={record}
                source="post_id"
                reference="posts"
              />
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <EditButton record={record} />
              <ShowButton record={record} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};