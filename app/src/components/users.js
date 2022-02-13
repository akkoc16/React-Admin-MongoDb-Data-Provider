import React from 'react';
import { List, Datagrid,SelectInput,ReferenceInput, TextField,TextInput,Edit, SimpleForm,DeleteButton,Create,EditButton } from 'react-admin';
//import dataProvider from '../providers/dataProvider';
//import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const userFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="index_name" label="Index" allowEmpty>
        <SelectInput optionText="name" />
    </ReferenceInput>,
];

const useStyles = makeStyles({
    table: {
        backgroundColor: '#FEF5ED',
    },
    headerCell: {
        backgroundColor: '#ADC2A9',
    },
});

export const UserList = props => {
    const classes = useStyles();
    return (
        <List filters={userFilters} {...props} bulkActionButtons={false} title="Indices" sort={{ field: 'id', order: 'DESC' }}>
            <Datagrid classes={classes} {...props} >
                <TextField source="_id" label="Object ID" sortable={true}/>
                <TextField source="index_name" label="Index Name"/>
                <TextField source="app_name" label="Application Name"/>
                <TextField source="policy" label="Policy"/>
                <TextField source="data_stream" label="Data Stream"/>
                <TextField source="shard" label="Shards"/>
                <TextField source="replica" label="Replicas"/>
                <EditButton color="#FEF5ED" />
                <DeleteButton ></DeleteButton>
            </Datagrid>
        </List>
    )
};

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm style={{backgroundColor:"#FEF5ED"}}>
            <TextInput source="_id" label="Object ID"/>
            <TextInput source="index_name" label="Index Name"/>
            <TextInput source="app_name" label="Application Name"/>
            <TextInput source="policy" label="Policy"/>
            <TextInput source="data_stream" label="Data Stream"/>
            <TextInput source="shard" label="Shards"/>
            <TextInput source="replica" label="Replicas"/>
        </SimpleForm>
    </Edit> );

export const UserCreate = props => (
    <Create {...props} >
        <SimpleForm style={{backgroundColor:"#FEF5ED"}} >
            <TextInput source="id" label="Index ID"/>
            <TextInput source="index_name" label="Index Name"/>
            <TextInput source="app_name" label="Application Name"/>
            <TextInput source="policy" label="Policy"/>
            <TextInput source="data_stream" label="Data Stream"/>
            <TextInput source="shard" label="Shards"/>
            <TextInput source="replica" label="Replicas"/>
        </SimpleForm>
    </Create>
 );