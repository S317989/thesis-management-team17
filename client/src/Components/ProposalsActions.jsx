import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import ProposalsForm from './ProposalsForm';
import React, { useState, useEffect } from 'react';
import sweetalert from "sweetalert";
import ProposalsAPI from '../APIs/ProposalsAPI';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddIcon from '@mui/icons-material/Add';
import { IconButton , Tooltip} from '@mui/material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EditNoteIcon from '@mui/icons-material/EditNote';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PageviewRoundedIcon from '@mui/icons-material/PageviewRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import ArchiveIcon from '@mui/icons-material/Archive';

export const ShowProposalsForm = ({ proposal, EnableEditing, EnableArchiving, EnableDeleting, OnComplete }) => {
    const [show, setShow] = useState(false);
    function ShowProposalModal() {
        setShow(true);
    }

    return (
        <>
          {!proposal && (
             <Tooltip title="Add New Proposal">
           <IconButton color="primary" size="large" onClick={ShowProposalModal}>
          <AddBoxIcon  sx={{ fontSize: 45 }} />
         </IconButton>
         </Tooltip>
          )}
          {proposal && (
            <Tooltip title="View & Update">
            <IconButton color="primary"  onClick={ShowProposalModal}>
            <BorderColorRoundedIcon/>
           </IconButton>
            </Tooltip>
          )}
    
          <Modal show={show} fullscreen onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{proposal ? proposal.Title : "Add new proposal"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProposalsForm
                EnableEditing={EnableEditing}
                EnableArchiving={EnableArchiving}
                EnableDeleting={EnableDeleting}
                proposal={proposal}
                OnComplete={() => {
                  if (OnComplete) OnComplete();
                  setShow(false);
                }}
              />
            </Modal.Body>
          </Modal>
        </>
      );
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
      <Tooltip title="Delete">
    <IconButton color="warning" onClick={() => handleDelete()}>
            <DeleteRoundedIcon/>
           </IconButton>
           </Tooltip>
           
      
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
        <Tooltip title="Archive">
      <IconButton color="secondary" onClick={handleArchive}>
        <ArchiveIcon />
      </IconButton>
    </Tooltip>
    </>
};
