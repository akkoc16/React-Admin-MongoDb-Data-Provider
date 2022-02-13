import React from 'react';
import { List, Datagrid, TextField, EditButton,TextInput, ReferenceInput,SelectInput,SimpleForm,Edit,Create } from 'react-admin';

export const PostList = props => (
   <List {...props}>
       <Datagrid rowClick="edit">
           <TextField source="id" />
           <TextField source="post_id" />
           <TextField source="body" />
           <TextField source="created_at" />
           <EditButton/>
       </Datagrid>
   </List>
   
);
export const 
PostEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <ReferenceInput source="id" reference="index">
            <SelectInput optionText="id"/>
            </ReferenceInput>
            <TextInput source="id"/>
            <TextInput source="title"/>
            <TextInput source="body"/>
        </SimpleForm>
    </Edit> );

export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users"><SelectInput optionText="id"/></ReferenceInput>
            <TextInput source="id"/>
            <TextInput source="title"/>
            <TextInput source="body"/>
        </SimpleForm>
    </Create>
 );