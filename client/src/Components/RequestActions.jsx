import React, { useState, useEffect } from 'react';
import { Button, Modal, ListGroup, Badge } from 'react-bootstrap';
import ApplicationsAPI from '../APIs/ApplicationsAPI';
import sweetalert from 'sweetalert';
import { InfoSquareFill } from "react-bootstrap-icons";
import RequestModal from './RequestModal';
import UtilitesAPI from '../APIs/UtilitiesAPI';


export const SecApprove = () => {

    //   const handleSecApprove = () => {
    //     sweetalert({
    //       title: "Are you sure you want to Approve this request?",
    //       text: "Once approved, it can be later approved by the professor.",
    //       icon: "warning",
    //       buttons: true,
    //       dangerMode: true,
    //     }).then(confirmed => {
    //       if (confirmed) {
    //         RequestsAPI.SecApproveRequest(requestId).then((result) => {
    //           if (result.status === 200) {
    //             sweetalert({
    //               title: "Request Approved",
    //               icon: "success",
    //               button: "Ok",
    //             }).then(() => { if (OnComplete) OnComplete() });
    
    //           }
    //           else {
    //             sweetalert({
    //               title: "Request couldn't be Approved",
    //               icon: "error",
    //               button: "Ok",
    //             });
    //           }
    //         })
    //       }
    //     });
    //   };
    
      return <>
        <Button variant="success" size='sm' style={{ borderRadius: '30px' }}>
          Approve
        </Button>{' '}
      </>
    };


export const ProfApprove = () => {

//   const handleProfApprove = () => {
//     sweetalert({
//       title: "Are you sure you want to Approve this request?",
//       text: "Once approved, the student can officialy start working.",
//       icon: "warning",
//       buttons: true,
//       dangerMode: true,
//     }).then(confirmed => {
//       if (confirmed) {
//         RequestsAPI.ProfApproveRequest(requestId).then((result) => {
//           if (result.status === 200) {
//             sweetalert({
//               title: "Request Approved",
//               icon: "success",
//               button: "Ok",
//             }).then(() => { if (OnComplete) OnComplete() });

//           }
//           else {
//             sweetalert({
//               title: "Request couldn't be Approved",
//               icon: "error",
//               button: "Ok",
//             });
//           }
//         })
//       }
//     });
//   };

  return <>
    <Button variant="success" size='sm' style={{ borderRadius: '30px' }}>
      Approve
    </Button>{' '}
  </>
};

export const RejectRequest = () => {

//   const handleProfReject = () => {
//     sweetalert({
//       title: "Are you sure you want to reject this request?",
//       icon: "warning",
//       buttons: true,
//       dangerMode: true,
//     }).then(confirmed => {
//       if (confirmed) {
//         RequestsAPI.ProfRejectRequest(requestId).then((result) => {
//           if (result.status === 200) {
//             sweetalert({
//               title: "Request Rejected",
//               icon: "success",
//               button: "Ok",
//             }).then(() => { if (OnComplete) OnComplete() });

//           }
//           else {
//             sweetalert({
//               title: "Request couldn't be rejected",
//               icon: "error",
//               button: "Ok",
//             });
//           }
//         })
//       }
//     });
//   };

  return <>
    <Button variant="danger" size='sm' style={{ borderRadius: '30px' }}>
      Reject
    </Button>{' '}
  </>
};


export const RequestChange = () => {

    //   const RequestChange = () => {
    //     sweetalert({
    //       title: "Are you sure you want to request change this request?",
    //       icon: "warning",
    //       buttons: true,
    //       dangerMode: true,
    //     }).then(confirmed => {
    //       if (confirmed) {
    //         RequestsAPI.RequestChange(requestId).then((result) => {
    //           if (result.status === 200) {
    //             sweetalert({
    //               title: "Change Requested!",
    //               icon: "success",
    //               button: "Ok",
    //             }).then(() => { if (OnComplete) OnComplete() });
    
    //           }
    //           else {
    //             sweetalert({
    //               title: "Change couldn't be Requested",
    //               icon: "error",
    //               button: "Ok",
    //             });
    //           }
    //         })
    //       }
    //     });
    //   };
    
      return <>
        <Button variant="warning" size='sm' style={{ borderRadius: '30px' }}>
          Request Change
        </Button>{' '}
      </>
    };

    export const ShowRequestForm = () => {

        const [show, setShow] = useState(false);
    
        function ShowRequestModal() {
            setShow(true);
        }
    
        return <>
            <InfoSquareFill className='info-icon' onClick={ShowRequestModal} />             
            <RequestModal show={show} setShow={setShow} />
        </>;
    };
    
    

