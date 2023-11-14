import React from 'react';
import { useEffect } from 'react';
import { UserContext } from '../Contexts';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';

function Home() {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h1>Home</h1>
            {
                user ?
                    user.role === 'Student' ?
                        <div>
                            <p>Id: {user.id}</p>
                            <p>Role: {user.role}</p>
                            <p>Surname: {user.surname}</p>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>Degree: {user.cod_degree}</p>
                            <p>Year: {user.enrollment_year}</p>
                            <p>Gender: {user.gender}</p>
                            <p>Nationality: {user.nationality}</p>
                        </div>
                        : <div>
                            <p>Id: {user.id}</p>
                            <p>Surname: {user.surname}</p>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>Role: {user.role}</p>
                            <p>Group: {user.cod_group}</p>
                            <p>Department: {user.cod_department}</p>
                        </div>
                    : <p>Not logged in</p>


            }
        </div>
    )
}

export default Home;