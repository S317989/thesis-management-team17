import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Components/Header'
import Home from './Pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom';
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

function App() {
  const arc1 = new Archive(0, "title1", "description1", "applicabnt", "stat")
  const arc2 = new Archive(1, "title2", "descrladj hbfldhfbs dlfhbl; gihbfp gilwhb gouehr ewygouweyrgoeruy goeryg eoryuigeoryui geiuhwfglie ugbliurego lwrubgyolrwituygb truyg orty gouirygolw irugy orwliuyg orlwuiy or rtgvp wiiption2", "applicabnt", "stat")
  const arc3 = new Archive(2, "title3", "description3", "applicabnt", "stat")
  const arc4 = new Archive(3, "title4", "description4", "applicabnt", "stat")

  const [archive, setArchive] = useState([arc1, arc2, arc3, arc4])

  const app1 = new Application(0, "title", "keywords", "refrences", "supervisor", "researchGroup", "thesisTypes", "requiredKnowledge", "deadline", "discription")

  const [application, setApplication] = useState(app1)
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);

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
