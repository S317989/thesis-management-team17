import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import Insert_student_request_Form from '../Components/InsertStudentRequest';


function InsertStudentRequest(){

return(
    <Insert_student_request_Form/>
);

}

export default InsertStudentRequest;