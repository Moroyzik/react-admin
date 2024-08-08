import { Admin, Resource } from 'react-admin';

import posts from './posts';
import comments from './comments';
import dataProvider from './dataProvider.ts'
import authProvider from './authProvider.ts';

function App() {

  return (
    <Admin authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="posts" {...posts} />
      <Resource name='comments' {...comments} />
    </Admin>
  )
}

export default App
