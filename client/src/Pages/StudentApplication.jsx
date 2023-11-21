import React, { useContext, useEffect } from "react";
import { UserContext } from "../Contexts";
import sweetalert from "sweetalert";
import ApplicationAPI from "../APIs/ApplicationAPI";
import ApplicationTable from "../Components/ApplicationTableTest";

function StudentApplication() {
    const { user } = useContext(UserContext);
    const [myApplications, setMyApplications] = React.useState(null);

    const renderApplications = () => {
        ApplicationAPI.getMyApplications(user.id)
            .then(async response => {
                if (response.status === 200) {
                    const data = await response.json();

                    console.log(data.applications);
                    setMyApplications(data.applications);
                }
            });
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            if (!user || user.role !== 'Student') {
                sweetalert({
                    title: "You are not authorized to access this page",
                    icon: "error",
                    button: "Ok",
                }).then(() => {
                    window.location.href = "http://localhost:3000/login";
                });
            } else
                renderApplications();
        };

        checkAuthentication();
    }, [user]);

    return (
        <>
            {
                user &&
                    user.role === 'Student' ?
                    <>
                        <h1>My Application</h1>

                        {
                            myApplications ? (
                                <>
                                    {myApplications.map((application) => (
                                        <div key={application.proposal_id}>
                                            <p>Proposal ID: {application.proposal_id}</p>
                                            <p>Title: {application.proposal_title}</p>
                                            <p>Supervisor Name: {application.proposal_supervisor_name}</p>
                                            <p>Supervisor Surname: {application.proposal_supervisor_surname}</p>
                                            <p>Supervisor Email: {application.proposal_supervisor_email}</p>
                                            <p>Keywords: {application.proposal_keywords}</p>
                                            <p>Type: {application.proposal_type}</p>
                                            <p>Description: {application.proposal_description}</p>
                                            <p>Required Knowledge: {application.proposal_requiredKnowledge}</p>
                                            <p>Notes: {application.proposal_notes}</p>
                                            <p>Expiration: {application.proposal_expiration}</p>
                                            <p>Level: {application.proposal_level}</p>
                                            <p>Student ID: {application.student_id}</p>
                                            <p>Status: {application.status}</p>
                                        </div>
                                    ))}
                                </>
                            ) : null

                        }

                    </>
                    : <h1> Please, log in to visualize your Informations </h1>
            }
        </>
    );
}

export default StudentApplication;