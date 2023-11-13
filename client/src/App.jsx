import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Pages/Login'
import Header from './Components/Header'
import Home from './Pages/Home'
import SecurePageTest from './Pages/SecurePageTest';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserContext } from './Contexts.js';
import AuthenticationAPI from './APIs/AuthenticationAPI.jsx';

function App() {
  const [user, setUser] = useState(null);

  /*useEffect(() => {
    AuthenticationAPI.getSessionAPI().then(async response => {
      const data = await response.json();

      if (response.status === 200) {
        setUser(data);
      }
    }).catch(error => {
      console.log("sas" + error.message);
    })
  }, []);*/

  return (
    <>
      {
        <UserContext.Provider value={{ user, setUser }}>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/secure-test" element={<SecurePageTest />} />
              <Route path="Login" element={<Login />} />
            </Routes>
          </div>
        </UserContext.Provider>
      }
    </>
  )
}

export default App
