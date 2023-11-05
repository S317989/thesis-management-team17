import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Components/Header'
import Home from './Pages/Home'
import LoginPage from './Pages/LoginPage'
import SecurePageTest from './Pages/SecurePageTest';
import ProtectedRoute from './Components/ProtectedRoute';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import ConfigAPI from './APIs/ConfigAPI';


function App() {
  const [keycloakConfig, setKeycloakConfig] = useState({
    realm: "", url: "", clientId: ""
  });

  useEffect(() => {
    ConfigAPI.getConfig().then(async (config) => {
      let conf = await config.json();
      setKeycloakConfig({
        realm: conf.realm,
        url: conf.url,
        clientId: conf.clientId,
      });
    });
  }, []);


  return (
    <>
      {keycloakConfig ? (
        <ReactKeycloakProvider authClient={keycloakConfig}>
          <BrowserRouter>
            <div className="App">
              <Header />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/secure-test"
                  element={
                    <ProtectedRoute>
                      <SecurePageTest />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </BrowserRouter>
        </ReactKeycloakProvider>
      )
        : <div> Loading... </div>
      }
    </>
  )
}

export default App
