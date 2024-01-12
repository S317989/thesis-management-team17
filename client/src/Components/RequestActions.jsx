import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ThesisAPI from '../APIs/ThesisAPI';
import sweetalert from 'sweetalert';
import { InfoSquareFill } from "react-bootstrap-icons";
import RequestModal from './RequestModal';

export const SecApprove = ({ requestId, OnComplete }) => {
  const handleSecApprove = () => {
    sweetalert({
      title: "Are you sure you want to Approve this request?",
      text: "Once approved, it can be later approved by the professor.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(confirmed => {
      if (confirmed) {
        ThesisAPI.setThesisRequestStatus(requestId, 'SecretaryAccepted').then((result) => {
          if (result.status === 200) {
            sweetalert({
              title: "Request Approved",
              icon: "success",
              button: "Ok",
            }).then(() => { if (OnComplete) OnComplete() });

          }
          else {
            sweetalert({
              title: "Request couldn't be Approved",
              icon: "error",
              button: "Ok",
            });
          }
        })
      }
    });
  };

  return <>
    <Button variant="success" size='sm' style={{ borderRadius: '30px' }} onClick={() => handleSecApprove()}>
      Approve
    </Button>{' '}
  </>
};


export const ProfApprove = ({ requestId, OnComplete }) => {
  const handleProfApprove = () => {
    sweetalert({
      title: "Are you sure you want to Approve this request?",
      text: "Once approved, the student can officialy start working.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(confirmed => {
      if (confirmed) {
        ThesisAPI.setThesisRequestStatus(requestId, 'Accepted').then((result) => {
          if (result.status === 200) {
            sweetalert({
              title: "Request Approved",
              icon: "success",
              button: "Ok",
            }).then(() => { if (OnComplete) OnComplete() });

          }
          else {
            sweetalert({
              title: "Request couldn't be Approved",
              icon: "error",
              button: "Ok",
            });
          }
        })
      }
    });
  };

  return (
    <Button variant="success" size='sm' style={{ borderRadius: '30px' }} onClick={() => handleProfApprove()}>
      Approve
    </Button>
  );
};

export const RejectRequest = ({ requestId, OnComplete }) => {

  const handleReject = () => {
    sweetalert({
      title: "Are you sure you want to reject this request?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(confirmed => {
      if (confirmed) {
        ThesisAPI.setThesisRequestStatus(requestId, 'Rejected').then((result) => {
          if (result.status === 200) {
            sweetalert({
              title: "Request Rejected",
              icon: "success",
              button: "Ok",
            }).then(() => { if (OnComplete) OnComplete() });

          }
          else {
            sweetalert({
              title: "Request couldn't be rejected",
              icon: "error",
              button: "Ok",
            });
          }
        })
      }
    });
  };

  return (
    <Button variant="danger" size='sm' style={{ borderRadius: '30px' }} onClick={() => handleReject()}>
      Reject
    </Button>
  );
};

export const RequestChange = ({ requestId, OnComplete }) => {

  const RequestChange = () => {
    sweetalert({
      title: "Are you sure you want to request change this request?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      content: {
        element: "input",
        attributes: {
          placeholder: "Type your reason here",
          type: "text",
        },
      }
    }).then(reason => {
      if (reason)
        ThesisAPI.setThesisRequestStatus(requestId, 'ChangeRequested', reason).then((result) => {
          if (result.status === 200) {
            sweetalert({
              title: "Change Requested!",
              icon: "success",
              button: "Ok",
            }).then(() => { if (OnComplete) OnComplete() });
          }
          else {
            sweetalert({
              title: "Change couldn't be Requested",
              icon: "error",
              button: "Ok",
            });
          }
        })
    });
  };

  return (
    <Button variant="warning" size='sm' style={{ borderRadius: '30px' }} onClick={() => RequestChange()}>
      Request Change
    </Button>
  );
};

export const ShowRequestForm = ({ request, OnComplete }) => {
  const [show, setShow] = useState(false);

  function ShowRequestModal() {
    setShow(true);
  }

  return (
    <>
      <InfoSquareFill className='info-icon' onClick={ShowRequestModal} />
      <RequestModal request={request} show={show} setShow={setShow} />
    </>
  );
};



