import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Components/Header'
import Home from './Pages/Home'
import { Route, Routes, useLocation, BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserContext } from './Contexts.js';
import AuthenticationAPI from './APIs/AuthenticationAPI';
import Archive from './custom classes/archive';
import Application from './custom classes/application';
import BrowseApplications from './Pages/BrowseApplications.jsx';
import BrowseProposals from './Pages/BrowseProposals.jsx';
import MyProposals from './Pages/MyProposals.jsx';
import SearchProposals from './Pages/SearchProposals'
import StudentApplications from './Pages/StudentApplications.jsx';
import { Roles } from './APIs/AuthenticationAPI';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let _user = new Promise((resolve, reject) => {
      AuthenticationAPI.getSessionAPI()
        .then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
    });

    Promise.all([_user]).then(async values => {
      if (values[0].status === 200)
        setUser(await values[0].json());
      else {
        setUser(null);
        window.location.href = "http://localhost:3000/login";
      }

      setIsLoading(false);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <>
      {
        isLoading ? <div>Loading...</div> :
          <Router>
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
          </Router>
      }
    </>
  )
}

export default App
