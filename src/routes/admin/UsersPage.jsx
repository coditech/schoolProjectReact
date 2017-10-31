import React from 'react';
import DataTable from "../../component/admin/DataTable";
import {Link} from "react-router-dom";

const UsersPage = (props) => {
const {users, deleteUser} = props;
    console.log('props', props);

    const actionPath = [
        {
            path: '/admin/users/edit',
            icon: 'fa-edit',
            title: 'Edit',
            key: 'id',

        },
        {
            path: '/admin/users',
            icon: 'fa-minus',
            title: 'Delete',
            key: 'id',
            action: deleteUser

        }
    ];
    const tableHeader = [
        {
            title: 'Id'
            , key: 'id'
        },
        {
            title: 'Name'
            , key: 'name'
        },
        {
            title: 'Username'
            , key: 'username'
        }, {
            title: 'Last Name'
            , key: 'lastName'
        }
    ]

    if (users.status === 0) {
        return <h2>Nine</h2>
    }
    if (users.status === 1) {
        return <div>Loading.....</div>
    }


    if (users.status === 2) {

        const items = users.users;
        const datas = {
            items,
            status: users.status
        }
        const passes_props = {
            actionPath
            , datas
            , tableHeader
            , deleteUser
        }
        return (
            <div>
                <h2>Admin Users Panel</h2>
                <Link to={'/admin/users/add'}>Add</Link>
                <DataTable {...passes_props}/>

            </div>
        )
    }
}


export default UsersPage;