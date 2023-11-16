import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Pages/Login'
import Header from './Components/Header'
import Home from './Pages/Home'
import SecurePageTest from './Pages/SecurePageTest';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserContext } from './Contexts.js';
import { jwtDecode } from 'jwt-decode';
import AuthenticationAPI from './APIs/AuthenticationAPI.jsx';
import AddProposal from './Pages/AddProposal.jsx'
import DegreeAPI from './APIs/DegreeApi.jsx';
import TeacherAPI from './APIs/TeacherAPI.jsx';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {

   

    AuthenticationAPI.getSessionAPI().then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          console.log("App info: ", data);
          setUser(data);
        });
      } else
        setUser(null);

    });
  }, []);

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
              <Route path="/proposal" element={<AddProposal />} />
            </Routes>
          </div>
        </UserContext.Provider>
      }
    </>
  )
}

export default App
