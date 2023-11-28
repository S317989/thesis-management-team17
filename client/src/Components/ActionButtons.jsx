import React from "react";
import { PencilFill, PlusSquareFill } from "react-bootstrap-icons";
import { ArchiveFill } from "react-bootstrap-icons";
import { Trash3Fill } from "react-bootstrap-icons";
import { InfoSquareFill } from "react-bootstrap-icons";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";

function ActionButtons(props) {
    const handleClick = () => {
        if (props.onClick)
            props.onClick();
    };

    const actionComponents = {
        Delete: <Trash3Fill style={{ cursor: 'pointer', fontSize: '20px', marginRight: '20px', color: 'maroon' }} />,
        Archive: <ArchiveFill style={{ cursor: 'pointer', fontSize: '20px', marginRight: '20px', color: 'orange' }} />,
        Add: (
            <Button className="float-end" style={{ display: 'flex', alignItems: 'center' }}>
                <PlusSquareFill style={{ cursor: 'pointer', fontSize: '30px' }} />
                <span style={{ marginLeft: '5px' }}>New Proposal</span>
            </Button>
        ),
        Info: <InfoSquareFill style={{ cursor: 'pointer', fontSize: '20px', marginRight: '20px', color: 'purple' }} />,
        Update: <PencilFill style={{ cursor: 'pointer', fontSize: '20px', marginRight: '20px', color: 'green' }} />
    };

    const overlayComponent = (
        <Tooltip>
            {props.action}
        </Tooltip>
    )

    return (
        props.action !== 'Add'
            ?
            <OverlayTrigger
                placement='top'
                overlay={overlayComponent}>
                {React.cloneElement(actionComponents[props.action], { onClick: handleClick })}
            </OverlayTrigger >
            : React.cloneElement(actionComponents[props.action], { onClick: handleClick })
    )
}
export default ActionButtons;