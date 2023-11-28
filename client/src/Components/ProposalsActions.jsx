import { Button, Modal } from 'react-bootstrap';
import ProposalsForm from './ProposalsForm';
import React, { useState } from 'react';
import sweetalert from "sweetalert";
import ProposalsAPI from '../APIs/ProposalsAPI';
import { PlusSquareFill } from "react-bootstrap-icons";
import { PencilFill } from "react-bootstrap-icons";
import { ArchiveFill } from "react-bootstrap-icons";
import { Trash3Fill } from "react-bootstrap-icons";

export const ShowProposalsForm = ({
    proposal, EnableEditing, EnableArchiving, EnableDeleting, EnableApplying, OnComplete
}) => {

    const [show, setShow] = useState(false);
    function ShowProposalModal() {
        setShow(true);
    }

    return <>
      {!proposal ? 
      <PlusSquareFill className="add-icon" onClick={ShowProposalModal} style={{ color: '#007bff'}}></PlusSquareFill> 
       : 
      <PencilFill className="edit-icon"  style={{color: '#31708f'}} onClick={ShowProposalModal}></PencilFill>}
      
        <Modal show={show} fullscreen onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{proposal ? proposal.Title : "Add new proposal"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ProposalsForm proposal={proposal}
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

    </>;
};

export const Delete = ({ proposalId, OnComplete }) => {
    const handleDelete = () => {
        sweetalert({
            title: "Are you sure you want to delete this proposal?",
            text: "Once deleted, all the related data and applications will be as well",
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
                        }).then(() => { if (OnComplete) OnComplete() });

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
        <Trash3Fill className="delete-icon" style={{color: '#d9534f'}} onClick={() => handleDelete()}>
            Delete
        </Trash3Fill>
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
                        }).then(() => { if (OnComplete) OnComplete() });
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
        <ArchiveFill  className="archive-icon" style={{color: '#f0ad4e'}} onClick={handleArchive}>
            Archive
        </ArchiveFill>
    </>
};
