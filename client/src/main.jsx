import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="thesis-management-team17.eu.auth0.com"
        clientId="fgIV2JAWJdjmSQPXK9GrtR4FgFomIqLS"
        authorizationParams={{
          redirect_uri: window.location.origin + "/secure-test"
        }}>
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
)
