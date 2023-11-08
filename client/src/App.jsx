import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Components/Header'
import Home from './Pages/Home'
import SecurePageTest from './Pages/SecurePageTest';
import { Route, Routes, useNavigate, } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/secure-test" element={<SecurePageTest />} />
        </Routes>
      </div>
    </>
  )
}

export default App
