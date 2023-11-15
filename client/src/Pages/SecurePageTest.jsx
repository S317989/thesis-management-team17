import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function SecurePageTest() {

    const testApplyForThesis = () => {
        fetch('http://localhost:3000/api/thesis/active-proposals', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <>
            <div>
                <h1>Secure Page</h1>
                <Button onClick={testApplyForThesis}>test apply for proposal</Button>
            </div>
        </>
    );
};

export default SecurePageTest;