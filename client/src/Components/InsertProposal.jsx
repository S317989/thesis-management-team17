import {Container, DropdownItem} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import Dropdown from 'react-bootstrap/Dropdown';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Radio, RadioGroup} from 'react-radio-group'

const uid = (function() {
    let id = 0;
    return function() {
        id++;
        return id;
    }
})();


function FilterDropDown(props) {
  const title = props.title;
  const itemList = props.itemList; //temporaneo per la prova, sostituire con DB
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(itemList);

  const getFilteredItems = (query, items) => {
    if (!query) return items;
    return items.filter((el) => el.includes(query)); // Adjust the filtering logic as needed
  };

  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    const updatedFiltered = getFilteredItems(newQuery, itemList);
    setFiltered(updatedFiltered);
  };

  const clearQuery = () => {
    setQuery('');
    setFiltered(itemList);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {title}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.ItemText>
          <div>
            <input
              type="text"
              placeholder="Search supervisor email to add"
              value={query}
              onChange={handleQueryChange}
            />
            {query && (
              <button onClick={clearQuery} className="clear-button">
                X
              </button>
            )}
          </div>
        </Dropdown.ItemText>
        {filtered.length === 0 ? (
          <h4>No email found</h4>
        ) : (
          filtered.map((item) => ( //gestire il parametro item.email, da prelevare dal database
            <Dropdown.Item key={item} onClick={() => {
              if(props.csvList){ //caso lista co supervisor
                if(!props.csvList.find((el)=>el===item)){
                let newList=[...props.csvList, item];
                props.setFun(newList);
                }
              } else{
              props.setFun(item)}
              }}>
              {item}
            </Dropdown.Item> 
          ))
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}



  

function InsertProposal(props){
    /*
        keywords: lista di elementi, input + list group
        type: come sopra
        supervisor + cosupervisor: dropdown + ricerca ottimizzata
        group predefinito,retrieve from db
        description testo
        notes: testo
        expiration date dayjs install
        level scelta doppia
        cds seleziona da lista degree table con nome e id per chiave
    */

    const [validated, setValidated] = useState(false);
    const [cosuper, setCosuper]= useState("");
    const [csvList, setCsvList]= useState([]);
    const [keyword, setKeyword]= useState('');
    const [keylist, setKeylist]= useState([]);
    const [type, setType]=useState('');
    const [typeList, setTypeList]= useState([]);
    const [sup, setSup]=useState('No supervisor selected'); //dove salvo il supervisor
    const itemList=['email1', 'email2', 'email3']; //temporaneo
    const tempcsv=['csv1', 'csv2', 'csv3']; //temporaneo
    const tempcds=['gestionale', 'informatica', 'elettronica', 'ambientale'];
    const [date,setDate]=useState('');
    const [level, setLevel]=useState('');


    const handleSubmit = (event) => {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            }

            setValidated(true);
    };


return(
        <>
        <h1>Add new proposal</h1>
    
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Title</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Title"
                defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <FilterDropDown title="Search supervisor's email" itemList={itemList} setFun={setSup} />
            <label>{sup}</label>
            {
                csvList.length==0 ?
                <h4>No co-supervisor added</h4>
                :
                <ListGroup>
                {
                    csvList.map((e)=> <ListGroup.Item key={e} >{e}<CloseButton onClick={()=>{
                        let newList= csvList.filter((obj) => obj.id !== e.id);
                        setCsvList(newList);
                    }} /></ListGroup.Item>)
                }
                </ListGroup>
            }
            <FilterDropDown title="Search co-supervisor's email" itemList={tempcsv} csvList={csvList} setFun={setCsvList} />

           
            {
                keylist.length==0 ?
                <h4>No keywords added</h4>
                :
                <ListGroup>
                {
                    keylist.map((e)=> <ListGroup.Item key={e.id} >{e.name}<CloseButton onClick={()=>{
                        let newList= keylist.filter((obj) => obj.id !== e.id);
                        setKeylist(newList);
                    }} /></ListGroup.Item>)
                }
                </ListGroup>
            }
            <InputGroup className="mb-3">
            <Form.Control
            placeholder="Keyword"
            aria-label="Keyword"
            aria-describedby="basic-addon2"
            value={keyword}
            onChange={(e)=>setKeyword(e.target.value)}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={()=>{
                if(keyword!==''){
                let newObj={id: uid(), name: keyword}; //add the client side id
                let list=[...keylist, newObj]; //supervisor accademici e non distinzione ancora TO DO
                setKeylist(list);
                setKeyword('');

                } else {
                    //tooltip non puoi inserire vuota error
                    console.log("non puoi inserire una keyword vuota")
                }
            }} >
            Add keyword
            </Button>
            </InputGroup>
            {
                keylist.length==0 ?
                <h4>No types added</h4>
                :
                <ListGroup>
                {
                    typeList.map((e)=> <ListGroup.Item key={e.id} >{e.name}<CloseButton onClick={()=>{
                        let newList= typeList.filter((obj) => obj.id !== e.id);
                        setTypeList(newList);
                    }} /></ListGroup.Item>)
                }
                </ListGroup>
            }
            <InputGroup className="mb-3">
            <Form.Control
            placeholder="Type"
            aria-label="Type"
            aria-describedby="basic-addon2"
            value={type}
            onChange={(e)=>setType(e.target.value)}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={()=>{
                if(type!==''){
                let newObj={id: uid(), name: type}; //add the client side id
                let list=[...typeList, newObj]; //supervisor accademici e non distinzione ancora TO DO
                setTypeList(list);
                setType('');

                } else {
                    //tooltip non puoi inserire vuota error
                    console.log("non puoi inserire un type vuoto")
                }
            }} >
            Add a type
            </Button>
            </InputGroup>
        </Row>
        <Row className="mb-3">
            <FloatingLabel controlId="floatingTextarea2" label="Description">
            <Form.Control
              as="textarea"
              placeholder="Description"
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTextarea2" label="Notes">
            <Form.Control
              as="textarea"
              placeholder="Notes"
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <label>Set expiration date</label>
          <input type='date' onChange={(e)=>setDate(dayjs(e.target.value).format('DD-MM-YYYY'))}  />
          <label>Choose level</label>
          <RadioGroup name="level" onChange={(e) =>setLevel(e)}>
            <div className="radio-button-background">
                <Radio value="BSc" className="radio-button" />BSc
            </div>
              <div className="radio-button-background">
                <Radio value="MSc" className="radio-button" />MSc
            </div>
            </RadioGroup>
           </Row>
           <Row>
            <label>Select a CdS</label>
           <Form.Select aria-label="Select a CdS">
           
            {
              tempcds ?
              tempcds.map((item)=><option key={item}>{item}</option>)
              :
              <h4>No CdS available</h4>
            }
            
            
          </Form.Select>
           </Row>
        <Button type="submit">Submit form</Button>
        </Form>
        
        </>
    );

}
export default InsertProposal;