import "../Stylesheets/CardManagerStyle.css";
import React, { useState, useEffect, useContext } from 'react';
import { Col, Form, Container, Row, Badge, Button } from 'react-bootstrap';
import CustomCard from './CustomCard';
import ProposalPagination from './ProposalPagination';
import FilterComponent from './FilterComponent';
import { UserContext } from '../Contexts';

const CardManager = ({ page, proposals, EnableEditing, EnableArchiving, EnableDeleting, EnableApplying, requestRefresh }) => {
    const { user } = useContext(UserContext);
    const [availableProposals, setAvailableProposals] = useState([]);
    const [filteredProposals, setFilteredProposals] = useState([]);
    const [proposalFields, setProposalFields] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [proposalsPerPage, setProposalsPerPage] = useState(3);
    const [filters, setFilters] = useState([]);

    const indexOfLastProposal = currentPage * proposalsPerPage;
    const indexOfFirstProposal = indexOfLastProposal - proposalsPerPage;
    const currentProposals = filteredProposals.slice(indexOfFirstProposal, indexOfLastProposal);

    const fetchData = async () => {
        const ap = [
            ...proposals.map(p => {
                const sf =
                    p.Title + ' ' +
                    p.Supervisor.Name + ' ' + p.Supervisor.Surname + ' ' +
                    p.Type + ' ' +
                    p.Description + ' ' +
                    p.Required_Knowledge + ' ' +
                    p.Notes + ' ' +
                    p.Expiration + ' ' +
                    p.Level + ' ' +
                    p.cosupervisors.reduce((final, current) => final + ' ' + current.Name + ' ' + current.Surname, '') + ' ' +
                    p.externalCosupervisors.reduce((final, current) => final + ' ' + current.Name + ' ' + current.Surname, '') + ' ' +
                    p.degrees.reduce((final, current) => final + ' ' + current.Title_Degree, '') + ' ' +
                    p.groups.reduce((final, current) => final + ' ' + current.Name, '') + ' ' +
                    p.keywords.reduce((final, current) => final + ' ' + current.Name, '');

                return ({ ...p, searchableFormat: sf.toLowerCase() });
            })
        ];

        setAvailableProposals(ap);
        setFilteredProposals(ap);
    };

    const handleSearch = (newValue) => {
        setCurrentPage(1);

        if (newValue === '') {
            setFilteredProposals(availableProposals);
        } else {
            setFilteredProposals(availableProposals.filter(p => p.searchableFormat.includes(newValue.toLowerCase())));
        }
    };

    const groupCardsIntoRows = (cards) => {
        const rows = [];
        const cardsPerRow = 3;

        for (let i = 0; i < cards.length; i += cardsPerRow) {
            const row = cards.slice(i, i + cardsPerRow);
            rows.push(row);
        }

        return rows;
    }

    const addFilter = (field, value) => {
        if (field && value) {
            setFilters((prevFilters) => [...prevFilters, { field, value }]);
        }
    }

    const removeFilter = (field) => {
        setFilters((prevFilters) => prevFilters.filter((filter) => filter.field !== field));
    };

    useEffect(() => {
        if (page == "AllProposals")
            setProposalsPerPage(6);

        fetchData();

    }, [proposals, page]);

    useEffect(() => {
        if (availableProposals.length > 0) {
            let proposalFields;
            if (user.role === "Student")
                proposalFields = Object.keys(availableProposals[0]).filter(key => key !== 'searchableFormat' && key !== 'Archived' && key !== 'Id')
            else
                proposalFields = Object.keys(availableProposals[0]).filter(key => key !== 'searchableFormat' && key !== 'Supervisor' && key !== 'Archived' && key !== 'Id');

            proposalFields = proposalFields.map((field) => {
                return field.charAt(0).toUpperCase() + field.slice(1);
            })

            setProposalFields(proposalFields);
        }

    }, [availableProposals]);

    useEffect(() => {
        if (filters.length > 0)
            filters.forEach((filter) => {
                handleSearch(filter.value);
            });
        else
            fetchData();
    }, [filters]);

    return (
        <Container className="card-manager-container">
            {
                proposalFields.length > 0 && (
                    <Container fluid style={{ zIndex: 1, position: 'static' }}>
                        <Row className="mb-3" style={{ zIndex: 1, position: 'relative' }}>
                            <Col style={{ zIndex: 1, position: 'relative' }}>
                                <FilterComponent
                                    proposalFields={proposalFields}
                                    onAddFilter={addFilter}
                                    onRemoveFilter={removeFilter}
                                    filters={filters}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="mb-2">
                                    {filters.map((filter, index) => (
                                        <Badge
                                            key={index}
                                            className="filter-badge"
                                            onClick={() => removeFilter(filter.field)}
                                        >
                                            {`${filter.field} - ${filter.value}`} &#10005;
                                        </Badge>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                )

            }
            {
                filteredProposals.length === 0 ? (
                    <p>No Found Proposals</p>
                ) : (
                    <>
                        {groupCardsIntoRows(currentProposals).map((row, rowIndex) => (
                            <Row key={rowIndex} className="card-manager-row">
                                {row.map((proposal, colIndex) => (
                                    <CustomCard
                                        key={colIndex}
                                        proposal={proposal}
                                        EnableApplying={EnableApplying}
                                        EnableArchiving={EnableArchiving}
                                        EnableDeleting={EnableDeleting}
                                        EnableEditing={EnableEditing !== undefined ? !EnableEditing : undefined}
                                        OnComplete={requestRefresh}
                                    />
                                ))}
                            </Row>
                        ))}
                        <Col xs={12} className="pagination-container">
                            <ProposalPagination
                                proposalsPerPage={proposalsPerPage}
                                totalProposals={filteredProposals.length}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </Col>
                    </>
                )
            }
        </Container>
    );
}

export default CardManager;
