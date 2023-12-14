import React, { useState } from 'react';
import { Button, Modal, ListGroup, Badge } from 'react-bootstrap';
import ApplicationsAPI from '../APIs/ApplicationsAPI';
import sweetalert from 'sweetalert';
import { FilePerson } from "react-bootstrap-icons";

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
    setCvFile(event.target.files[0]);
  };

  const handleApply = () => {
    handleCloseModal(); // Close the modal before making the application request

    const formData = new FormData();
    formData.append('pdfFile', cvFile);
    formData.append('proposalId', proposalId);

    sweetalert({
      title: 'Are you sure you want to apply to this proposal?',
      text: 'Once you apply, you will not be able to make other applications until this one is accepted or rejected',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((confirmed) => {
      if (confirmed) {
        ApplicationsAPI.applyToProposal(formData).then((result) => {
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
          {/* <input type="file" accept=".pdf, .doc, .docx" onChange={handleFileChange} /> */}
          <input type="file" name="pdfFile" accept=".pdf" onChange={handleFileChange} required />
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


export const ViewCV = ({ cvFileName }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Dummy data for testing
  const dummyExams = [
    { Cod_Course: '04GSPOV', Title_Course: 'Software Engineering', CFU: '8', Grade: 26, Date: '2023-07-04' },
    { Cod_Course: '01UDFOV', Title_Course: 'Web Applications I', CFU: '6', Grade: 20, Date: '2023-02-22' },
    { Cod_Course: '01SQMOV', Title_Course: 'Data Science and Database Technology', CFU: '8', Grade: 29, Date: '2023-07-19' },
  ];

  return (
    <>
      <FilePerson className="fileperson-icon" style={{ color: '#B99470' }} variant="info" onClick={handleShowModal}>
      </FilePerson>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Student Exams and CV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Exams:</h4>
          <ListGroup as="ol" numbered className="mt-3 mb-3">
            {dummyExams.map((exam, index) => (
              <ListGroup.Item key={index} as="li" className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{`${exam.Title_Course}:`}{' '} <Badge bg="primary">{`${exam.Grade}`}</Badge> </div>
                  {`${exam.Cod_Course}`}
                </div>
                <Badge bg="secondary" pill>
                  {`${exam.CFU}`}{' '}{'CFU'}
                </Badge>
              </ListGroup.Item>
              //   <li key={index}>{`${exam.subject}: ${exam.grade}`}</li>
            ))}
          </ListGroup>
          {cvFileName ? <Button onClick={() => {
            window.open('http://localhost:3000/api/uploads/' + cvFileName, '_blank', 'noopener,noreferrer');
          }}>Check the student CV</Button> : <></>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewCV;
