import React from 'react';
import {Link} from "react-router-dom";

const STATUS = {
    NONE: 0,
    LOADING: 1,
    READY: 2,
    ERROR: 3
};

const UsersAddPage = ({addUserData, match, addUser, handleUserAddInputChange}) => {


    const handleInputChange = (event) => {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const keyName = {
            user_id: 'id',
            user_name: 'name',
            user_lastName: 'lastName',
            user_gender: 'gender',
            user_email: 'email',
            user_telephone: 'telephone',
            user_userType: 'userType',
            user_username: 'username',
            user_password: 'password',

        };
        const field = {
            key: keyName[name]
            , value
        }
        handleUserAddInputChange(field)

    }

    const user = addUserData;

    if (!addUserData.status) {
        return (
            <div>
                <Link to={'/admin/users'}>Back</Link>
                <h2>Add </h2>

                <form action="" onSubmit={(e) => {
                    e.preventDefault();
                    addUser()
                }}>
                    <div>
                        <label htmlFor="user_id">Id</label>
                        <input type="number" id="user_id" name="user_id"
                               onChange={(e) => handleInputChange(e)}
                               defaultValue={user.name}/>
                    </div>
                    <div>
                        <label htmlFor="user_name">Name</label>
                        <input type="text" id="user_name" name="user_name"
                               onChange={(e) => handleInputChange(e)}
                               defaultValue={user.name}/>
                    </div>
                    <div>
                        <label htmlFor="user_lastName">Last Name</label>
                        <input type="text" id="user_lastName" name="user_lastName"
                               onChange={(e) => handleInputChange(e)} defaultValue={user.lastName}/>
                    </div>
                    <div>
                        <label htmlFor="user_gender">Gender</label>
                        <select name="user_gender" id="user_gender" onChange={(e) => handleInputChange(e)}
                                defaultValue={user.gender}>
                            <option value="null">Choose Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="user_email">Email</label>
                        <input type="text" id="user_email" name="user_email" onChange={(e) => handleInputChange(e)}
                               defaultValue={user.email}/>
                    </div>
                    <div>
                        <label htmlFor="user_telephone">Phone</label>
                        <input type="text" id="user_telephone" name="user_telephone"
                               onChange={(e) => handleInputChange(e)} defaultValue={user.telephone}/>
                    </div>

                    <div>
                        <label htmlFor="user_userType">User Type</label>
                        <select name="user_userType" id="user_userType" onChange={(e) => handleInputChange(e)}
                                defaultValue={user.userType}>
                            <option value="">Choose Role</option>
                            <option value="admin">Admin</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="user_username">Username</label>
                        <input type="text" id="user_username" name="user_username"
                               onChange={(e) => handleInputChange(e)} defaultValue={user.username}/>
                    </div>
                    <div>
                        <label htmlFor="user_password">Password</label>
                        <input type="text" id="user_password" name="user_password"
                               onChange={(e) => handleInputChange(e)} defaultValue={user.password}/>
                    </div>
                    <div>
                        <button type="submit">
                            Submit
                        </button>
                    </div>
                </form>

            </div>
        )
    }
    if (addUserData.status === STATUS.LOADING) {
        return <h2>Loading ....</h2>
    }

    if (addUserData.status === STATUS.READY) {

        return <h2>Redirect Back Success Add person</h2>
    }
    if (addUserData.status === STATUS.ERROR) {

        return <h2>{addUserData.error}</h2>
    }

}
export  default UsersAddPage;