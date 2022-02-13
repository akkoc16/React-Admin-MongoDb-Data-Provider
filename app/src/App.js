import React from 'react';
import { Admin, Resource} from 'react-admin';
import {UserList,UserEdit,UserCreate} from "./components/users";
import { PostList,PostEdit,PostCreate } from './components/posts';
import authProvider from "./providers/authProvider";
import Dashboard from './Dashboard';
import dataProvider from './providers/dataProvider';
import MyLayout from './MyLayout';
import { defaultTheme } from "react-admin";
import { createTheme } from '@material-ui/core/styles';
//import Create from "./components/create";

const theme = createTheme({
    ...defaultTheme,
    sidebar: {
        width: 260, // The default value is 240
        closedWidth: 70, // The default value is 55
    },
});

function App() {
   return (
       <div>
       <Admin theme={theme} layout={MyLayout} dataProvider={dataProvider} authProvider={authProvider} dashboard={Dashboard}>
           <Resource name="index" list={UserList} edit={UserEdit} create={UserCreate}/>
       </Admin>
       </div>
   );
}
export default App;

