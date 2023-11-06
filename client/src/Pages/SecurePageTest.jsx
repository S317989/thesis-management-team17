import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function SecurePageTest() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (

        isAuthenticated ?
            <div>
                < img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div >
            :
            <div>
                <h2>You are not logged in!</h2>
            </div>
    );
};

export default SecurePageTest;