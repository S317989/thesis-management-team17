import React from 'react';
import Button from 'react-bootstrap/Button';
import TestAPI from '../APIs/TestAPI';


function Home() {
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
        <div>
            <h1>Home</h1>

            <Button onClick={handleTestGet}>Test GET</Button>
            <Button onClick={handleTestPost}>Test POST</Button>

        </div>
    )
}

export default Home;