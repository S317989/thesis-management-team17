import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { UserContext } from '../Contexts';
import ProposalsTable from './ProposalsTable';
import sweetalert from 'sweetalert';
import { fontSize } from '@mui/system';

const ProposalsSearchForm = ({
  proposals, EnableEditing, EnableArchiving, EnableDeleting, EnableApplying, requestRefresh
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availableProposals, setAvailableProposals] = useState([]);
  const [filteredProposals, setFilteredProposals] = useState([]);

  useEffect(() => {
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
  }, [proposals]);

  const { user } = useContext(UserContext);

  const handleSearch = (newValue) => {
    setSearchTerm(newValue);
    if (newValue === '') {
      setFilteredProposals(availableProposals);
    }
    else {
      setFilteredProposals(availableProposals.filter(p => p.searchableFormat.includes(newValue.toLowerCase())));
    }
  };

  return (
    <Col>
      {/* <p style={{ fontSize: "10px", textAlign: "start", padding: "0" }}> You can search by: Proposal Title, Supervisor, Type, Description, Required Knowledge, Notes, Expiration, Level, Cosupervisors, External Cosupervisors, Degrees, Groups Or Keywords</p> */}
      <Form.Control
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search by title, supervisor, etc."
      />
      {filteredProposals.length === 0 ? (
        <p>No Found Proposals</p>
      ) : (
        <ProposalsTable
          proposals={filteredProposals}
          EnableEditing={EnableEditing}
          EnableArchiving={EnableArchiving}
          EnableDeleting={EnableDeleting}
          EnableApplying={EnableApplying}
          requestRefresh={requestRefresh}
        />
      )}
    </Col>
  );
};

export default ProposalsSearchForm;

