import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SecurePageTest() {

    const SamlCallback = () => {
        const location = useLocation();
        // Analizza i parametri dell'URL o gestisci la risposta dell'API
        const samlResponse = location.searchParams.get('SAMLResponse');

        // Ora puoi gestire i dati di autenticazione come desideri
        return <div>SAML Response: {samlResponse}</div>;
    };

    return (
        <>
            <div>
                <h1>Secure Page</h1>
            </div>
        </>
    );
};

export default SecurePageTest;