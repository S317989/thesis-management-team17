import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/Header'
import Home from './Pages/Home'
import {ApplyForProposal} from './Pages/Apply-for-proposal';
import LoginPage from './Pages/LoginPage'
import { Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import SearchArchive from './Pages/Search-Archive';
import Archive from './custom classes/archive'
import Application from './custom classes/application';

function App() {

  const arc1 = new Archive(0, "title1", "description1", "applicabnt", "stat")
  const arc2 = new Archive(1, "title2", "descrladj hbfldhfbs dlfhbl; gihbfp gilwhb gouehr ewygouweyrgoeruy goeryg eoryuigeoryui geiuhwfglie ugbliurego lwrubgyolrwituygb truyg orty gouirygolw irugy orwliuyg orlwuiy or rtgvp wiiption2", "applicabnt", "stat")
  const arc3 = new Archive(2, "title3", "description3", "applicabnt", "stat")
  const arc4 = new Archive(3, "title4", "description4", "applicabnt", "stat")

  const [archive, setArchive] = useState([arc1, arc2, arc3, arc4])

  const app1 = new Application (0,"title", "keywords", "refrences", "supervisor", "researchGroup", "thesisTypes", "requiredKnowledge", "deadline", "discription")
  
  const [application, setApplication] = useState(app1)
  


  const [title, setTitle] = useState("")
  const [supervisor, setSupervisor] = useState("")
  const [thesisType, setThesisType] = useState("")
  const [description, setDescription] = useState("")
  const [researchGroups, setResearchGroups] = useState("")
  const[keyword, setKeyword] = useState("")
  const[refrences, setRefrences] = useState("")
  const[requiredKnowledge, setRequiredKnowledge]=useState("")
  const[deadline, setDeadline]=useState("")
  const[applicant, setApplicant]=useState ("")
  const[status, setStatus]=useState("")
  const[badgeStatus, setBadgeStatus]=useState("accepted")


  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Header />
         
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="sa" element={<SearchArchive  archive= {archive}  />}/>
            <Route path="/application" element={<ApplyForProposal  badgeStatus={badgeStatus} application= {application}   ></ApplyForProposal>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}


export default App
