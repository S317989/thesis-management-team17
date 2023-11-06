import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="thesis-management.us.auth0.com"
        clientId="ovNQAlfSV9jnDBRiumuJmeBN7edsgAZk"
        authorizationParams={{
          redirect_uri: window.location.origin + "/secure-test"
        }}>
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
)
