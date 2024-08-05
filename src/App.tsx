import { Admin } from 'react-admin';

import { dataProvider } from './dataProvider.ts'

import './App.css'

function App() {

  return (
    <Admin dataProvider={dataProvider}>

    </Admin>
  )
}

export default App
