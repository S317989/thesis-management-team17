import React, { useContext, useEffect } from "react";
import { UserContext } from "../Contexts";
import sweetalert from "sweetalert";
import ApplicationAPI from "../APIs/ApplicationAPI";
import ApplicationTable from "../Components/ApplicationTableTest";

function BrowseApplicationTest(props) {
    const [applications, setApplications] = React.useState([]);
    const { user } = useContext(UserContext);

    const renderApplications = () => {
        ApplicationAPI.getAllApplications()
            .then(async response => {
                if (response.status === 200) {
                    const data = await response.json();
                    setApplications(data.applications);
                }
            });
    };

    useEffect(() => {
        renderApplications();
    }, []);

    return (
        <>
            {
                user.role === 'Teacher' ?
                    <>
                        <h1>Browse Application</h1>
                        <ApplicationTable applications={applications} renderApp={renderApplications} />
                    </>
                    : <h1> Please, log in to visualize your Informations </h1>
            }
        </>
    );
}

export default BrowseApplicationTest;