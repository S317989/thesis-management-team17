import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import ProposalsForm from './ProposalsForm';
import React, { useState, useEffect } from 'react';
import sweetalert from "sweetalert";
import ProposalsAPI from '../APIs/ProposalsAPI';

export const ShowProposalsForm = ({ proposal, EnableEditing, EnableArchiving, EnableDeleting, OnComplete }) => {
    const [show, setShow] = useState(false);
    function ShowProposalModal() {
        setShow(true);
    }

    return <>
        <Button variant="dark" onClick={ShowProposalModal}>
            {!proposal ? "Add new proposal" : "Show Details"}
        </Button>{' '}
        <Modal show={show} fullscreen onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{proposal ? proposal.Title : "Add new proposal"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ProposalsForm EnableEditing={EnableEditing} EnableArchiving={EnableArchiving}
                    EnableDeleting={EnableDeleting} proposal={proposal} OnComplete={() => {
                        OnComplete();
                        setShow(false);
                    }} />
            </Modal.Body>
        </Modal>
    </>;
};

export const Delete = ({ proposalId, OnComplete }) => {
    const handleDelete = () => {
        sweetalert({
            title: "Are you sure you want to delete this proposal?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(confirmed => {
            if (confirmed) {
                ProposalsAPI.deleteProposal(proposalId).then((result) => {
                    if (result.status === 200) {
                        sweetalert({
                            title: "Proposal Deleted",
                            icon: "success",
                            button: "Ok",
                        }).then(() => OnComplete());

                    }
                    else {
                        sweetalert({
                            title: "Proposal couldn't be deleted",
                            icon: "error",
                            button: "Ok",
                        });
                    }
                })
            }
        });
    };
    return <>
        <Button variant="danger" onClick={() => handleDelete()}>
            Delete
        </Button>{' '}
    </>
};

export const Archive = ({ proposalId, OnComplete }) => {
    const handleArchive = () => {
        sweetalert({
            title: "Are you sure you want to archive this proposal?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(confirmed => {
            if (confirmed) {
                ProposalsAPI.archiveProposal(proposalId).then((result) => {
                    if (result.status === 200) {
                        sweetalert({
                            title: "Proposal Archived",
                            icon: "success",
                            button: "Ok",
                        }).then(() => OnComplete());
                    }
                    else {
                        sweetalert({
                            title: "Proposal couldn't be archived",
                            icon: "error",
                            button: "Ok",
                        });
                    }
                })
            }
        });
    };

    return <>
        <Button variant="warning" onClick={handleArchive}>
            Archive
        </Button>{' '}
    </>
};
