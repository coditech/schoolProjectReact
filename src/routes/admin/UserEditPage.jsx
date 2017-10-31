import React from 'react';
import {Link} from "react-router-dom";


const UserEditPage = ({location, match, editUser, editUserData, handleEditInputChange}) => {



    const handleInputChange = (event) => {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const keyName = {
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
        handleEditInputChange(field)

    }

    const userId = match.params.id;
    if (editUserData.status === 1) {
        return <h2>Loading</h2>
    } else if (editUserData.status === 2) {

        const user = editUserData.user;
        return (
            <div>
                <Link to={'/admin/users'}>Back</Link>
                <h2>edit {match.params.id} </h2>

                <form action="" onSubmit={(e) => editUser()}>
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
                            <option value="student">Parent</option>
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
    } else if (editUser.status === 3) {
        return (
            <h2>users with id {userId}, is Not found</h2>
        )
    } else {
        return <h3>Undefined error</h3>
    }

}

export default UserEditPage;