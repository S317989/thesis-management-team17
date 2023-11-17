import React, { useEffect } from "react";
import InsertProposal from "../Components/InsertProposal";
import BrowseApplicationTest from "./BrowseApplicationTest";
import { Container, Card } from 'react-bootstrap';
import ProposalButtonTest from "../Components/ProposalsButtonTest";
import { UserContext } from "../Contexts";
import sweetalert from "sweetalert";

function ProposalPageTest(props) {
    const [activePage, setActivePage] = React.useState(null);
    const { user } = React.useContext(UserContext);

    const handleButtonClick = (page) => {
        setActivePage(page);
    };

    const renderPageContent = () => {
        switch (activePage) {
            case 'InsertProposalTest':
                return <InsertProposal />;
            case 'BrowseApplicationTest':
                return <BrowseApplicationTest />;
            default:
                return null;
        }
    };

    useEffect(() => {
        if (!user || user.role !== 'Teacher') {
            sweetalert({
                title: "Access Denied",
                text: "You do not have permission to access this page.",
                icon: "error",
                button: "OK",
            }).then(() => {
                window.location.href = "http://localhost:3000/login";
            });
        }
    }, [user]);

    return (
        <Container className="mt-5 text-center">
            <h1>Choose a Page</h1>
            <ProposalButtonTest label="Insert Proposal Page" onClick={() => handleButtonClick('InsertProposalTest')} />
            <ProposalButtonTest label="Browse Application Page" onClick={() => handleButtonClick('BrowseApplicationTest')} />

            {activePage && (
                <Card className="mt-3">
                    <Card.Body>
                        {renderPageContent()}
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}

export default ProposalPageTest;