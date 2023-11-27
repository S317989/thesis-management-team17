import { Button } from 'react-bootstrap';
import ApplicationsAPI from "../APIs/ApplicationsAPI";
import sweetalert from "sweetalert";

export const Apply = ({ proposalId, OnComplete }) => {
    const handleDelete = () => {
        sweetalert({
            title: "Are you sure you want to apply to this proposal?",
            text: "Once you apply you will not be able to make other applications untill this one is accepted or rejected",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(confirmed => {
            if (confirmed) {
                ApplicationsAPI.applyToProposal(proposalId).then((result) => {
                    if (result.status === 200) {
                        sweetalert({
                            title: "Application Made",
                            icon: "success",
                            button: "Ok",
                        }).then(() => { if (OnComplete) OnComplete() });

                    }
                    else {
                        sweetalert({
                            title: "Application couldn't be made.",
                            icon: "error",
                            button: "Ok",
                        });
                    }
                })
            }
        });
    };
    return <>
        <Button onClick={() => handleDelete()}>
            Apply
        </Button>{' '}
    </>
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
        <Button variant="success" onClick={() => handleDelete()}>
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
        <Button variant="danger" onClick={() => handleReject()}>
            Reject
        </Button>{' '}
    </>
};