import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Stack, Navbar, Form, Badge} from 'react-bootstrap'


function SearchArchive(props){
  

  return(
  <>
  
  <Container >
        <div>
            <h1>Archive</h1>
        </div>
    <Row className="  justify-content-md-center mt-5 "> 
      <Col  xs={12} md={12}>
        
      <Row >
        <Col className="custom-border" xs={3} md={3} >
                Title
        </Col>
        <Col className="custom-border" xs={3} md={3} >
                Description
        </Col>
        <Col className="custom-border" xs={3} md={3} >
                Applicant
        </Col>
        <Col  className="custom-border"xs={3} md={3} >
                Status
        </Col>  
    </Row>
{
 
     props.archive.map((eachArchive)=> <Table key= {eachArchive.id} title={eachArchive.title} badgeStatus={true} description={eachArchive.description} applicant={eachArchive.applicant} status={eachArchive.status}/>)
}
     
        
      </Col>
    </Row>
  </Container>
  </>
  );
  }



function Badges(props) {

  <Container className="centered-badge"> </Container>



  if (props.badgeStatus == "accepted"){
    return(
      <Stack   gap={2}>
        <Badge className='' bg="success">Accepted</Badge>
      </Stack>
      );
  }
  else if(props.badgeStatus == "rejected" ){

    return (
      <Stack  gap={2}>
        <Badge  bg="danger">Rejected</Badge>
      </Stack>
  );  

  }

  else{
    return (
      <Stack  gap={2}>
        <Badge  bg="secondary">Pending</Badge>
      </Stack>
  );  
    }
  }


 



function Table(props){
  return(
    
   <>
  
   
    <Row >
      <Col className="custom-border" xs={3} md={3} >
                  {props.title}
      </Col>
      <Col className="custom-border" xs={3} md={3} >
              {props.description}
      </Col>
      <Col className="custom-border" xs={3} md={3} >
            {props.applicant}
      </Col>
      <Col className="custom-border " xs={3} md={3} >
              <Badges badgeStatus ={props.badgeStatus} />
              
      </Col> 
    </Row>
       
  
   
   </>
   
      );}


export default SearchArchive;