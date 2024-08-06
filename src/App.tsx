import { Admin, Resource } from 'react-admin';

import posts from './posts';
import dataProvider from './dataProvider.ts'

function App() {

  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="posts" {...posts} />
    </Admin>
  )
}

export default App
