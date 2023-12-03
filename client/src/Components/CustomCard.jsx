import "../Stylesheets/CardManagerStyle.css";
import React, { useState } from "react";
import { Badge, Card, Modal } from "react-bootstrap";
import ProposalsForm, { ProposalFields } from "./ProposalsForm";


const CustomCard = ({ proposal, EnableEditing, EnableArchiving, EnableDeleting, EnableApplying, OnComplete }) => {
    const [show, setShow] = useState(false);

    const handleCardClick = () => {
        setShow(true);
    };

    return (
        <>
            <Card onClick={handleCardClick} className="card-item">
                <Card.Header>{proposal.Title}</Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">{proposal.Expiration}</Card.Subtitle>
                    <Card.Text className="truncate-text">
                        {proposal.Description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {
                        proposal.keywords.map((keyword) => (
                            <Badge key={keyword.Id} bg="rgb(252, 122, 8)" className="me-1 badge-item">{keyword.Name}</Badge>
                        ))
                    }
                </Card.Footer>
            </Card>

            <Modal show={show} fullscreen onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{
                        proposal ?
                            (
                                proposal[ProposalFields.Id] ?
                                    proposal[ProposalFields.Title]
                                    : "Make a new proposal starting from " + proposal[ProposalFields.Title]
                            )
                            : "Add new proposal"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProposalsForm
                        proposal={proposal}
                        EnableEditing={EnableEditing}
                        EnableArchiving={EnableArchiving}
                        EnableDeleting={EnableDeleting}
                        EnableApplying={EnableApplying}
                        OnComplete={() => {
                            if (OnComplete) OnComplete();
                            setShow(false);
                        }} />
                </Modal.Body>
            </Modal>

        </>
    )
}

export default CustomCard;