// FilterComponent.jsx
import React, { useEffect, useState } from "react";
import { Dropdown, Table, InputGroup, FormControl } from "react-bootstrap";
import { FilterCircle } from "react-bootstrap-icons";

const FilterComponent = ({ proposalFields, onAddFilter, filters, onRemoveFilter }) => {
    const [proposalMiddle, setProposalMiddle] = useState(0);
    const [editableFields, setEditableFields] = useState({});
    const [activeField, setActiveField] = useState({
        type: '',
        value: '',
    });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activeProposalFields, setActiveProposalFields] = useState([]);

    const handleFieldClick = (field) => {
        setActiveField({
            type: field,
            value: editableFields[field] || ''
        });
        setEditableFields((prevFields) => ({
            ...prevFields,
            [field]: true,
        }));
    };

    const handleInputChange = (e) => {
        setEditableFields((prevFields) => ({
            ...prevFields,
            [activeField.type]: e.target.value,
        }));
    };

    const handleInputBlur = (field) => {
        if (activeField && editableFields[activeField.value] && editableFields[activeField.value] !== true) {
            onAddFilter(activeField.type, editableFields[activeField.value]);
            setActiveProposalFields((prevFields) => prevFields.filter((field) => field !== activeField.type));
        }

        setActiveField({
            type: null,
            value: null,
        });

        setEditableFields((prevFields) => ({
            ...prevFields,
            [activeField.type]: false,
        }));

        setDropdownOpen(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            if (activeField.type && editableFields[activeField.type] && editableFields[activeField.type] !== true) {
                onAddFilter(activeField.type, editableFields[activeField.type]);
                setActiveProposalFields((prevFields) => prevFields.filter((field) => field !== activeField.type));
            }
            setActiveField({
                type: null,
                value: null,
            });
            setEditableFields((prevFields) => ({ ...prevFields, [activeField.type]: false }));
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        setProposalMiddle(Math.ceil(proposalFields.length / 2));
        setActiveProposalFields(proposalFields);
    }, [proposalFields]);

    return (
        <Dropdown show={dropdownOpen} onToggle={(isOpen) => setDropdownOpen(isOpen)} drop={'down-centered'}>
            <Dropdown.Toggle id="dropdown-basic">
                Filters
                <FilterCircle style={{ marginLeft: '5px' }} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Table hover borderless id="dropdown-table">
                    <tbody>
                        <tr>
                            <td>
                                {activeProposalFields.slice(0, proposalMiddle).map((field, index) => (
                                    <div key={index}>
                                        {editableFields[field] ? (
                                            <InputGroup>
                                                <FormControl
                                                    type={field === "Expiration" ? "date" : "text"}
                                                    placeholder={field}
                                                    value={editableFields[field] !== true ? editableFields[field] : ""}
                                                    onChange={handleInputChange}
                                                    onBlur={() => handleInputBlur(field)}
                                                    onKeyPress={handleKeyPress}
                                                    style={{ cursor: "pointer" }}
                                                    autoFocus
                                                />
                                            </InputGroup>
                                        ) : (
                                            <p onClick={() => handleFieldClick(field)} className="clickable-text">{field}</p>
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
                                                    placeholder={field}
                                                    value={editableFields[field] !== true ? editableFields[field] : ""}
                                                    onChange={handleInputChange}
                                                    onBlur={() => handleInputBlur(field)}
                                                    onKeyPress={handleKeyPress}
                                                    style={{ cursor: "pointer" }}
                                                    autoFocus
                                                />
                                            </InputGroup>
                                        ) : (
                                            <p onClick={() => handleFieldClick(field)} className="clickable-text">{field}</p>
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
