import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function SecurePageTest() {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    const { persistAccessToken } = useAuth0();

    useEffect(() => {
        if (isLoading) return;

        const getUserMetadata = async () => {
            let accessToken = await getAccessTokenSilently();

            console.log(accessToken);
        };

        getUserMetadata();

    }, [isAuthenticated, getAccessTokenSilently]);

    return (
        <>
            {
                isLoading || !isAuthenticated ? <div>Loading ...</div>
                    : <p>Sas</p>
            }
        </>
    );
};

export default SecurePageTest;