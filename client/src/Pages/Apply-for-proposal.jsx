import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button, Badge, Stack, Navbar, Form} from 'react-bootstrap'


function ApplyForProposal(props){

  return(
  <>
  <Container>
    <Row className="justify-content-md-center mt-3"> 
      <Col xs={8} md={8}>

      

     <Table  title={props.application.title} supervisor={props.application.supervisor} thesisType={props.application.thesisType} description={props.application.description} researchGroup = {props.application.researchGroup} keywords={props.application.keywords } refrences={props.application.refrences} requiredKnowledge={props.application.requiredKnowledge} deadline={props.application.deadline}></Table>     
      </Col>
      <Col xs={4} md={4}>
        <Badges badgeStatus={props.badgeStatus}></Badges> 
      </Col>
    </Row>
    <ApplicationButton></ApplicationButton>
  </Container>
  </>
  );
  }

function Badges(props) {

  if (props.badgeStatus){
    return(
      <Stack direction="horizontal" gap={2}>
        <Badge className='' bg="secondary">Thesis</Badge>
        <Badge bg="primary">Open</Badge>
      </Stack>
      );
  }

  else{
    return (
      <Stack direction="horizontal" gap={2}>
        <Badge className='' bg="secondary">Thesis</Badge>
        <Badge bg="danger">Restricted</Badge>
      </Stack>
  );  
    }
  }

 



function Table(props){
  return(
    <>
    <Container className='align-left'>



    <Row >
          <Col xs={4} md={3} >
            Title
          </Col>
          <Col xs={8} md={6}>
            {props.title}       
         </Col>
        </Row>

      
      <Row >
          <Col xs={4} md={3} >
            Keywords
          </Col>
          <Col xs={8} md={6} >
            {props.keywords}

          </Col>
        </Row>

        <Row >
          <Col xs={4} md={3} >
            Refrences
          </Col>
          <Col xs={8} md={6}>
            {props.refrences}       
         </Col>
        </Row>


        <Row>
          <Col xs={4} md={3} >
            Supervisor
          </Col>
          <Col xs={8} md={6}>
            {props.supervisor}       
         </Col>
        </Row>

        <Row>
          <Col xs={4} md={3} >
            Research Group
          </Col>
          <Col xs={8} md={6}>
            {props.researchGroup}       
         </Col>
        </Row>


        <Row>
          <Col xs={4} md={3} >
            Thesis Types
          </Col>
          <Col xs={8} md={6}>
            {props.thesisType}       
         </Col>
        </Row>

        


        <Row>
          <Col xs={4} md={3} >
            Required Knowledge
          </Col>
          <Col xs={8} md={6}>
            {props.requiredKnowledge}       
         </Col>
        </Row>


        <Row>
          <Col xs={4} md={3} >
            Deadline
          </Col>
          <Col xs={8} md={6}>
            {props.deadline}       
         </Col>
        </Row>

        <Row>
          <Col xs={4} md={3} >
            Description
          </Col>
          <Col xs={8} md={6}>
            {props.description}       
         </Col>
        </Row>
     
    </Container>
    </>
  )
}
function Search() {
  return (
<Navbar className="bg-body-tertiary justify-content-between">
<Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}

function ApplicationButton(props) {
  return (
    <div className="d-grid gap-2">
      <Button variant="primary" size="lg">
       Send Application
      </Button>
      
    </div>
  );
}


export {ApplyForProposal};