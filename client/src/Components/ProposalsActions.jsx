import { Modal } from 'react-bootstrap';
import ProposalsForm, { ProposalFields } from './ProposalsForm';
import React, { useState } from 'react';
import sweetalert from "sweetalert";
import ProposalsAPI from '../APIs/ProposalsAPI';
import ActionButtons from './ActionButtons';
import ProposalsModal from './ProposalModal';

export const ShowProposalsForm = ({
    proposal, EnableEditing, EnableArchiving, EnableDeleting, EnableApplying, OnComplete
}) => {

    const [show, setShow] = useState(false);

    function ShowProposalModal() {
        setShow(true);
    }

    return <>
        {
            !proposal ?
                <ActionButtons action="Add" className="add-button" onClick={ShowProposalModal} />
                : !proposal[ProposalFields.Id] ?
                    <ActionButtons action="Copy" onClick={ShowProposalModal} />
                    : EnableEditing ?
                        <ActionButtons action="Update" onClick={ShowProposalModal} />
                        : <ActionButtons action="Info" onClick={ShowProposalModal} />
        }

        <ProposalsModal proposal={proposal} EnableEditing={EnableEditing} EnableArchiving={EnableArchiving} EnableDeleting={EnableDeleting} EnableApplying={EnableApplying} OnComplete={OnComplete} show={show} setShow={setShow} />
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
        <ActionButtons action="Delete" onClick={() => handleDelete()} />
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
        <ActionButtons action="Archive" onClick={handleArchive} />
    </>
};
