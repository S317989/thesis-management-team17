import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/Header'
import Home from './Pages/Home'
import LoginPage from './Pages/LoginPage'
import SearchForm from './Components/SearchForm';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/thesis-proposals" element={<SearchForm/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
