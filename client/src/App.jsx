import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Pages/Login'
import Header from './Components/Header'
import Home from './Pages/Home'
import SecurePageTest from './Pages/SecurePageTest';
import AddProposal from './Pages/AddProposal';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserContext } from './Contexts.js';
import { jwtDecode } from 'jwt-decode';
import AuthenticationAPI from './APIs/AuthenticationAPI.jsx';
import SearchArchive from './Pages/Search-Archive';
import Archive from './custom classes/archive';
import Application from './custom classes/application';
import { ApplyForProposal } from './Pages/Apply-for-proposal';

function App() {
  const arc1 = new Archive(0, "title1", "description1", "applicabnt", "stat")
  const arc2 = new Archive(1, "title2", "descrladj hbfldhfbs dlfhbl; gihbfp gilwhb gouehr ewygouweyrgoeruy goeryg eoryuigeoryui geiuhwfglie ugbliurego lwrubgyolrwituygb truyg orty gouirygolw irugy orwliuyg orlwuiy or rtgvp wiiption2", "applicabnt", "stat")
  const arc3 = new Archive(2, "title3", "description3", "applicabnt", "stat")
  const arc4 = new Archive(3, "title4", "description4", "applicabnt", "stat")

  const [archive, setArchive] = useState([arc1, arc2, arc3, arc4])

  const app1 = new Application(0, "title", "keywords", "refrences", "supervisor", "researchGroup", "thesisTypes", "requiredKnowledge", "deadline", "discription")

  const [application, setApplication] = useState(app1)
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
              <Route path="sa" element={<SearchArchive archive={archive} />} />
              <Route path="/application" element={<ApplyForProposal application={application} />} />
              <Route path="/proposal" element={<AddProposal />} />

            </Routes>
          </div>
        </UserContext.Provider>
      }
    </>
  )
}

export default App
