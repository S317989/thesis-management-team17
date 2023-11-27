import { Button, Modal } from 'react-bootstrap';
import ProposalsForm from './ProposalsForm';
import React, { useState } from 'react';
import sweetalert from "sweetalert";
import ProposalsAPI from '../APIs/ProposalsAPI';
import { PlusSquareFill } from "react-bootstrap-icons";
import { PencilFill } from "react-bootstrap-icons";
import { ArchiveFill } from "react-bootstrap-icons";
import { Trash3Fill } from "react-bootstrap-icons";
import { InfoSquareFill } from "react-bootstrap-icons";

export const ShowProposalsForm = ({
    proposal, EnableEditing, EnableArchiving, EnableDeleting, EnableApplying, OnComplete
}) => {

    const [show, setShow] = useState(false);
    function ShowProposalModal() {
        setShow(true);
    }

    return <>
      {!proposal ? 
      <PlusSquareFill onClick={ShowProposalModal} style={{ cursor: 'pointer', fontSize: '40px', color: '#007bff'}}></PlusSquareFill> 
       : 
      <InfoSquareFill style={{ cursor: 'pointer', fontSize: '20px' , marginRight: '20px', color:'purple'}} onClick={ShowProposalModal}></InfoSquareFill>}
      
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
        <Trash3Fill style={{ cursor: 'pointer', fontSize: '20px' , marginRight: '20px', color:'maroon'}} onClick={() => handleDelete()}>
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
        <ArchiveFill style={{ cursor: 'pointer', fontSize: '20px',  marginRight: '20px', color:'orange'}} onClick={handleArchive}>
            Archive
        </ArchiveFill>
    </>
};
