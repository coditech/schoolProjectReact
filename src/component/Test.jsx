import React from 'react';
import {Link} from "react-router-dom";
const Test = ({loadArticles, getUsers,login,getuserById,deleteUser}) => {

    const min = 1, max = 6;

    let counter = Math.floor(Math.random() * (max - min + 1)) + min;
    return (
        <div>
            <button onClick={() => {
                deleteUser({id: 14});
            }}>Delete
            </button>
             <button onClick={() => {
                 getuserById({id: 7});
            }}>Click me api test
            </button>

            <button onClick={() => {
            login('admin', 'admin')
            }}>Login
            </button>
            <Link to={'/'} >Home</Link>
            <Link to={'/admin/users/2'} >admin/users/2</Link>
            <Link to={'/admin/2'} >admin/2</Link>
        </div>
    )

}

export default Test;