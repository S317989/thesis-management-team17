import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ApplicationsAPI from '../APIs/ApplicationsAPI';
import sweetalert from 'sweetalert';

export const Apply = ({ proposalId, OnComplete }) => {
  const [showModal, setShowModal] = useState(false);
  const [cvFile, setCvFile] = useState(null);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCvFile(file);
  };

  const handleApply = () => {
    handleCloseModal(); // Close the modal before making the application request

    sweetalert({
      title: 'Are you sure you want to apply to this proposal?',
      text: 'Once you apply, you will not be able to make other applications until this one is accepted or rejected',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((confirmed) => {
      if (confirmed) {
        ApplicationsAPI.applyToProposal(proposalId, cvFile).then((result) => {
          if (result.status === 200) {
            sweetalert({
              title: 'Application Made',
              icon: 'success',
              button: 'Ok',
            }).then(() => {
              if (OnComplete) OnComplete();
            });
          } else {
            sweetalert({
              title: "Application couldn't be made.",
              icon: 'error',
              button: 'Ok',
            });
          }
        });
      }
    });
  };

  return (
    <>
      <Button style={{ backgroundColor: '#23527c', border: 'none' }} onClick={handleShowModal}>
        Apply
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload CV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" accept=".pdf, .doc, .docx" onChange={handleFileChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


export const Accept = ({ applicationId, OnComplete }) => {
    const handleDelete = () => {
        sweetalert({
            title: "Are you sure you want to Accept this application?",
            text: "Once accepted, the proposal will be archived and the other applications on the same proposal will be rejected.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(confirmed => {
            if (confirmed) {
                ApplicationsAPI.acceptApplication(applicationId).then((result) => {
                    if (result.status === 200) {
                        sweetalert({
                            title: "Application Accepted",
                            icon: "success",
                            button: "Ok",
                        }).then(() => { if (OnComplete) OnComplete() });

                    }
                    else {
                        sweetalert({
                            title: "Application couldn't be Accepted",
                            icon: "error",
                            button: "Ok",
                        });
                    }
                })
            }
        });
    };
    return <>
        <Button variant="success" size='sm' style={{ borderRadius: '30px' }} onClick={() => handleDelete()}>
            Accept
        </Button>{' '}
    </>
};

export const Reject = ({ applicationId, OnComplete }) => {
    const handleReject = () => {
        sweetalert({
            title: "Are you sure you want to reject this application?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(confirmed => {
            if (confirmed) {
                ApplicationsAPI.rejectApplication(applicationId).then((result) => {
                    if (result.status === 200) {
                        sweetalert({
                            title: "Application Rejected",
                            icon: "success",
                            button: "Ok",
                        }).then(() => { if (OnComplete) OnComplete() });

                    }
                    else {
                        sweetalert({
                            title: "Application couldn't be rejected",
                            icon: "error",
                            button: "Ok",
                        });
                    }
                })
            }
        });
    };
    return <>
        <Button variant="danger" size='sm' style={{ borderRadius: '30px' }} onClick={() => handleReject()}>
            Reject
        </Button>{' '}
    </>
};