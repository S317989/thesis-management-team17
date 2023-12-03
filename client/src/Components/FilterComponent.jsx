// FilterComponent.jsx
import React, { useEffect, useState } from "react";
import { Dropdown, Table, InputGroup, FormControl } from "react-bootstrap";

const FilterComponent = ({ proposalFields, onAddFilter, filters, onRemoveFilter }) => {
    const [proposalMiddle, setProposalMiddle] = useState(0);
    const [editableFields, setEditableFields] = useState({});
    const [activeField, setActiveField] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activeProposalFields, setActiveProposalFields] = useState([]);

    const handleFieldClick = (field) => {
        setActiveField(field);
        setEditableFields((prevFields) => ({
            ...prevFields,
            [field]: true,
        }));
    };

    const handleInputChange = (e) => {
        setEditableFields((prevFields) => ({
            ...prevFields,
            [activeField]: e.target.value,
        }));
    };

    const handleInputBlur = (field) => {
        setActiveField(null);
        setEditableFields((prevFields) => ({
            ...prevFields,
            [field]: false,
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            if (activeField && editableFields[activeField]) {
                onAddFilter(activeField, editableFields[activeField]);
                // Remove from activeProposalFields
                setActiveProposalFields((prevFields) => prevFields.filter((field) => field !== activeField));

            }
            setActiveField(null);
            setEditableFields((prevFields) => ({ ...prevFields, [activeField]: false }));

            setDropdownOpen(false); // Chiude la dropdown
        }
    };


    useEffect(() => {
        setProposalMiddle(Math.ceil(proposalFields.length / 2));
        setActiveProposalFields(proposalFields);
    }, [proposalFields]);

    return (
        <Dropdown show={dropdownOpen} onToggle={(isOpen) => setDropdownOpen(isOpen)}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Filters
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Table hover borderless style={{ marginBottom: 0 }}>
                    <tbody>
                        <tr>
                            <td>
                                {activeProposalFields.slice(0, proposalMiddle).map((field, index) => (
                                    <div key={index}>
                                        {editableFields[field] ? (
                                            <InputGroup>
                                                <FormControl
                                                    type="text"
                                                    value={editableFields[field] !== true ? editableFields[field] : ""}
                                                    onChange={handleInputChange}
                                                    onBlur={() => handleInputBlur(field)}
                                                    onKeyPress={handleKeyPress}
                                                    autoFocus
                                                />
                                            </InputGroup>
                                        ) : (
                                            <p onClick={() => handleFieldClick(field)}>{field}</p>
                                        )}
                                    </div>
                                ))}
                            </td>
                            <td>
                                {activeProposalFields.slice(proposalMiddle).map((field, index) => (
                                    <div key={index}>
                                        {editableFields[field] ? (
                                            <InputGroup>
                                                <FormControl
                                                    type="text"
                                                    value={editableFields[field] !== true ? editableFields[field] : ""}
                                                    onChange={(e) => handleInputChange(field, e.target.value)}
                                                    onBlur={() => handleInputBlur(field)}
                                                    onKeyPress={handleKeyPress}
                                                />
                                            </InputGroup>
                                        ) : (
                                            <p onClick={() => handleFieldClick(field)}>{field}</p>
                                        )}
                                    </div>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default FilterComponent;
