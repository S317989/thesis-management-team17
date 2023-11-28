import React from "react";
import { PencilFill, PlusSquareFill } from "react-bootstrap-icons";
import { ArchiveFill } from "react-bootstrap-icons";
import { Trash3Fill } from "react-bootstrap-icons";
import { InfoSquareFill } from "react-bootstrap-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function ActionButtons(props) {
    const handleClick = () => {
        if (props.onClick)
            props.onClick();
    };

    const actionComponents = {
        Delete: <Trash3Fill style={{ cursor: 'pointer', fontSize: '20px', marginRight: '20px', color: 'maroon' }} />,
        Archive: <ArchiveFill style={{ cursor: 'pointer', fontSize: '20px', marginRight: '20px', color: 'orange' }} />,
        Add: <PlusSquareFill style={{ cursor: 'pointer', fontSize: '40px', color: '#007bff' }} />,
        Info: <InfoSquareFill style={{ cursor: 'pointer', fontSize: '20px', marginRight: '20px', color: 'purple' }} />,
        Update: <PencilFill style={{ cursor: 'pointer', fontSize: '20px', marginRight: '20px', color: 'green' }} />
    };

    const overlayComponent = <Tooltip>{props.action}</Tooltip>

    return (
        <OverlayTrigger
            placement='top'
            overlay={overlayComponent}>
            {React.cloneElement(actionComponents[props.action], { onClick: handleClick })}
        </OverlayTrigger >
    )
}

export default ActionButtons;