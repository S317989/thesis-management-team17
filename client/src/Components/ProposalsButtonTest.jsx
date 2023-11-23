import React from 'react';
import { Button } from 'react-bootstrap';

const ProposalButtonTest = ({ onClick, label }) => {
    return (
        <Button variant="primary" className="m-3" onClick={onClick}>
            {label}
        </Button>
    );
};

export default ProposalButtonTest;