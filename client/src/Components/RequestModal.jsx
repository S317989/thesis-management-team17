import "../Stylesheets/ProposalModalStyle.css";
import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import RequestForm from "./RequestForm";
import { RequestFields } from './RequestsTable';

function RequestModal({request, OnComplete, show, setShow}) {

    return (
        <Modal id='#proposal-modal-id' show={show} fullscreen onHide={() => setShow(false)}>
            <Modal.Header style={{ overflow: 'hidden' }} closeButton className="modal-header" closeVariant="white">
                <Modal.Title style={{ overflow: 'hidden' }} className="modal-title"> 
                {request[RequestFields.Title]}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <RequestForm request={request} OnComplete={() => { 
                if (OnComplete) OnComplete(); 
                setShow(false); }}/>
            </Modal.Body>
        </Modal >
    )
}

export default RequestModal;