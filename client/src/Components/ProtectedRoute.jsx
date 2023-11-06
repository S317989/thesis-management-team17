import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useOktaAuth } from '@okta/okta-react';

function ProtectedRoute(redirect) {
    const { authState } = useOktaAuth();

    if (!authState) {
        return <div>Loading...</div>;
    }

    return (
        authState.isAuthenticated ? <Outlet /> : <Navigate to="/" />
    );
}

export default ProtectedRoute;