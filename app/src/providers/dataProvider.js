//import jsonRestProvider from 'ra-data-fakerest';
//import data from '../data';

//const disableFakeFetchRequestsLogs = true;

//export default jsonRestProvider(data, disableFakeFetchRequestsLogs);

import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:27130/index';
const httpClient = fetchUtils.fetchJson;

export default {
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([
                (page - 1) * perPage,
                page * perPage - 1,
            ]),
            filter: JSON.stringify(params.filter),
        };
        //const url = `${apiUrl}/${resource}?${stringify(query)}`;

        
        const url = `${apiUrl}?${stringify(query)}`;


        const { headers, json } = await httpClient(url);
        return ({
            data: json,
            //data: json.map(resource => ({...resource, id: resource._id})),
            total: parseInt(headers.get('content-range'), 10),
        });
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data},
        })),

    delete: (resource, params) => 
        httpClient(`${apiUrl}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }));
    }
};