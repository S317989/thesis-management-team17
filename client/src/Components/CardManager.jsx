import "../Stylesheets/CardManagerStyle.css";
import React, { useState, useEffect } from 'react';
import { Col, Form, Container, Row } from 'react-bootstrap';
import CustomCard from './CustomCard';
import ProposalPagination from './ProposalPagination';

const CardManager = ({ page, proposals, EnableEditing, EnableArchiving, EnableDeleting, EnableApplying, requestRefresh }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [availableProposals, setAvailableProposals] = useState([]);
    const [filteredProposals, setFilteredProposals] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [proposalsPerPage, setProposalsPerPage] = useState(3);

    const indexOfLastProposal = currentPage * proposalsPerPage;
    const indexOfFirstProposal = indexOfLastProposal - proposalsPerPage;
    const currentProposals = filteredProposals.slice(indexOfFirstProposal, indexOfLastProposal);

    useEffect(() => {
        if (page == "AllProposals")
            setProposalsPerPage(6);

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



    }, [proposals, page]);

    const handleSearch = (newValue) => {
        setSearchTerm(newValue);
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

    return (
        <Container className="card-manager-container">
            <Form.Control
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by title, supervisor, etc."
            />
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
                                        EnableEditing={EnableEditing}
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
