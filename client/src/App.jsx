import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Components/Header'
import Home from './Pages/Home'
import SecurePageTest from './Pages/SecurePageTest';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, } from 'react-router-dom';
import { UserContext } from "./Contexts.js";
import AuthenticationAPI from './APIs/AuthenticationAPI.jsx';
import { useAuth0 } from "@auth0/auth0-react";


function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {

    const getUserMetadata = async () => {
      let accessToken = await getAccessTokenSilently();

      console.log(accessToken);
    };

    getUserMetadata();

  }, [getAccessTokenSilently]);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/secure-test" element={<SecurePageTest />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </>
  )
}

export default App
