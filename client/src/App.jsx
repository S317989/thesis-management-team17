import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Components/Header'
import Home from './Pages/Home'
import SecurePageTest from './Pages/SecurePageTest';
import { Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';


function App() {
  const navigate = useNavigate();

  const oktaAuth = new OktaAuth({
    issuer: 'https://thesis-management.us.auth0.com/oauth2/default',
    clientId: 'ovNQAlfSV9jnDBRiumuJmeBN7edsgAZk',
    redirectUri: window.location.origin + '/'
  });

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin), { replace: true });
  };


  return (
    <>
      <div className="App">
        <Header />
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/secure-test" element={<SecurePageTest />} />
            </Route>
          </Routes>
        </Security>
      </div>
    </>
  )
}

export default App
