import "../Stylesheets/ProposalModalStyle.css";
import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import ProposalsForm, { ProposalFields } from './ProposalsForm';

function RequestModal({show, setShow }) {

    return (
        <Modal id='#proposal-modal-id' show={show} fullscreen onHide={() => setShow(false)}>
            <Modal.Header style={{ overflow: 'hidden' }} closeButton className="modal-header" closeVariant="white">
                <Modal.Title style={{ overflow: 'hidden' }} className="modal-title"> Dummy Request 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Dummy Description
            </Modal.Body>
        </Modal >
    )
}

export default RequestModal;