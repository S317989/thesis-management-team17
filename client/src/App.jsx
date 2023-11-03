import TestAPI from './APIs/TestAPI';
import './App.css'

import Button from 'react-bootstrap/Button';

function App() {

  const handleTestGet = () => {
    TestAPI.getTest()
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  };

  const handleTestPost = () => {
    TestAPI.postTest()
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  return (
    <>
      <p>New App</p>
      <Button type="submit" size="lg" variant="outline-primary" className="float-end" id="login-button"
        onClick={handleTestGet}>
        Get
      </Button>

      <Button type="submit" size="lg" variant="outline-primary" className="float-end" id="login-button"
        onClick={handleTestPost}>
        Post
      </Button>    </>
  )
}

export default App
