import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Components/Header'
import Home from './Pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserContext } from './Contexts.js';
import AuthenticationAPI from './APIs/AuthenticationAPI';
import BrowseApplications from './Pages/BrowseApplications.jsx';
import BrowseProposals from './Pages/BrowseProposals.jsx';
import MyProposals from './Pages/MyProposals.jsx';
import SearchProposals from './Pages/SearchProposals'
import StudentApplications from './Pages/StudentApplications.jsx';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    AuthenticationAPI.getSessionAPI().then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          
          setUser(data);
        });
      } else {
        setUser(null);
        window.location.href = "http://localhost:3000/login";
      }

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
              <Route path="/proposals" element={<SearchProposals />} />
              <Route path="/browse-applications" element={<BrowseApplications />} />
              <Route path="/browse-proposals" element={<BrowseProposals />} />
              <Route path="/my-proposals" element={<MyProposals />} />
              <Route path="/student-applications" element={<StudentApplications />} />

            </Routes>
          </div>
        </UserContext.Provider>
      }
    </>
  )
}

export default App
