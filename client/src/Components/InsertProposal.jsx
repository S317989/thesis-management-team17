import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import CreatableSelect, { useCreatable } from 'react-select/creatable';
import RadioGroup from '@mui/material/RadioGroup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Radio from '@mui/material/Radio';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import { DatePicker } from '@mui/x-date-pickers';
import ListItem from '@mui/material/ListItem';
import ProposalAPI from '../APIs/ProposalApi';

import AddIcon from '@mui/icons-material/Add';

import { FormControlLabel, FormLabel } from '@mui/material';

function InsertProposal(props) {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [keyerror, setKeyerror] = useState(false);
  const [csvList, setCsvList] = useState([]);
  const [keywordList, setKeywordList] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const [keylist, setKeylist] = useState([]);
  const [exSuplist, setExSuplist] = useState([]);
  const [cds, setCds] = useState([]);
  const [typerror, setTyperror] = useState(false);
  const [type, setType] = useState('');
  const [typeList, setTypeList] = useState([]);
  const [superror, setSuperror] = useState(false);
  const [cdserror, setCdserror] = useState(false);
  const [sup, setSup] = useState('');
  const [levelerror, setLevelerror] = useState(false);
  const [descerror, setDescerror] = useState(false);
  const [formerror, setFormerror] = useState(false);
  const [date, setDate] = useState('');
  const [level, setLevel] = useState('Bachelor');
  const [success, setSuccess] = useState(false);
  const [grouplist, setGrouplist] = useState([]);
  const [notes, setNotes] = useState('');
  const [toAddK, setToAddK] = useState([]); //nuove keyword senza id
  const [desc, setDesc] = useState('');
  const [know, setKnow] = useState(''); // required knowledge
  const [cosuper, setCosuper] = useState({ name: '', surname: '', email: '' });
  const [modalerror, setModalerror] = useState([false, false, false]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const svList = props.teacherList ?? []; //teacher supervisor and co supervisors



  useEffect(() => {
    if (props.keywordsList) {
      setKeywordList(props.keywordsList);
    }
  }, [props.keywordsList]);




  const externalList = props.csvlist ?? [];//external co supervisor list retrieved



  const tempcds = props.degreeList ?? [];
  //list of courses retrieved by db from CoSupervisor Table

  const handleCreate = (inputValue) => {
    let newArray = [...toAddK, inputValue]; //lista di keyword da aggiungere al db
    setToAddK(newArray);//da fare nel submit finale del form
  };

  const handleTagsChange = (event, values) => {

    let arr = values.map((item) => {
      let itemArray = item.split(',');
      let emailValue = itemArray[0]; //email value
      if (itemArray[3]) {
        let groupValue = itemArray[3]; //groupNAme se è accademico
        let newArray = [...grouplist, groupValue];
        setGrouplist(newArray);//aggiorno la lista di gruppi
      }
      let newEmailArray = [...csvList, emailValue];

      setCsvList(newEmailArray); //aggiorno la lista di email dei prof supervisor e cosupervisor
    })
    console.log(values)
  };

  const handleDelete = (item, list) => {
    let newList = list.filter((e) => e !== item);
    return newList;
  };

  const handleSubmitCoSuper = () => {
    const newErrors = [
      cosuper.name.trim() === '',
      cosuper.surname.trim() === '',
      cosuper.email.trim() === '',
    ];

    setModalerror(newErrors);

    if (newErrors.includes(true)) {
      //handle error empty string not valid
    }
    else {
      handleClose();
      let newArray = [...exSuplist, cosuper];//adding external cosuper in the list of external ones
      setExSuplist(newArray); //da aggiungere alla tabella apposita
      console.log(cosuper, exSuplist);
      setCosuper({ name: '', surname: '', email: '' }); //clear the object

    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isFormValid = true;


    // Validate title
    if (title.trim() === '') {
      setTitleError(true);
      isFormValid = false;
    } else {
      setTitleError(false);
    }
    if (!sup) {
      setSuperror(true);
      isFormValid = false;
    }
    if (typeList.length === 0) {
      setTyperror(true);
      isFormValid = false;
    }

    if (keylist.length === 0) {
      setKeyerror(true);
      isFormValid = false;
    }
    if (cds.length == 0) {
      setCdserror(true);
      isFormValid = false;
    }
    if (!desc) {
      setDescerror(true);
      isFormValid = false;
    }
    if (!level) {
      setLevelerror(true);
      isFormValid = false;
    }

    // Check if the form is valid before proceeding
    if (!isFormValid) {
      // If the form is not valid, stop the submission
      setFormerror(true);
      return;
    }
    //csvList, grouplist, cds tabelle a parte

    try {
      // Make the API call
      const response = await ProposalAPI.newThesisProposal(
        title,
        sup,
        keylist.join(','),
        typeList.join(','),
        desc,
        know,
        notes,
        date,
        level
      );
      const data = await ProposalAPI.

        console.log(response)
      if (response.ok) {
        console.log('Proposal submitted successfully');
        // Reset the form fields
        setTitle('');
        setSup('');
        setNotes('');
        setDesc('');
        setKnow('');
        setType('');
        setTypeList([]);
        setGrouplist([]);
        setKeylist([]);
        setKeyword('');
        setCsvList([]);
        setDate(dayjs());
        setCds([]);
        setSuccess(true);
      } else {
        console.error('Error submitting proposal:', response.status);
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle unexpected errors
    }
  };

  return (
    <>
      {success ?
        <>
          <Typography>Form submitted correctly</Typography>
          <Button variant="contained" onClick={() => setSuccess(false)} color="secondary">
            Submit another proposal
          </Button>
        </>
        :
        <Container className="main-container">
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '100vh' }}
          >
            <Box>
              <Typography style={{ marginTop: '3rem' }} variant="h5" component="div">
                Insert Proposal
              </Typography>
            </Box>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={titleError}
                    helperText={titleError && 'Title is required'}
                    fullWidth
                    label="Insert Title*"
                    variant="filled"
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setTitleError(false); // Clear the error when the user starts typing
                    }}
                    sx={{ margin: '8px 0' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    id="Select a supervisor"
                    clearOnEscape
                    options={svList}
                    onChange={(event, newValue) => {
                      let valuesArray = newValue.split(',');
                      let emailValue = valuesArray[0];
                      let groupValue = valuesArray[3]; //groupName
                      let newArray = [...grouplist, groupValue];
                      setSup(emailValue);//mando solo la mail
                      setGrouplist(newArray); //aggiorno la lista dei gruppi selezionati

                      setSuperror(false); //clear error input
                    }}
                    renderInput={(params) => (
                      <TextField
                        error={superror}
                        helperText={superror ? "Supervisor required" : ''}
                        {...params}
                        label="Select a supervisor*"
                        variant="standard"
                      />
                    )}
                    sx={{ margin: '8px 0' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={svList} //supervisor accademici oppure aggiungerne di nuovi esterni
                    getOptionLabel={(option) => option}
                    onChange={handleTagsChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Add co-supervisors"
                        placeholder="Co-supervisors"
                      />
                    )}
                  />
                </Grid>
                <div>
                  <Button onClick={handleOpen}>Add external co-supervisor</Button>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                      backdrop: {
                        timeout: 500,
                      },
                    }}
                  >
                    <Fade in={open}>
                      <Box sx={style}>
                        <TextField
                          error={modalerror[0]}
                          helperText={modalerror[0] && 'Name not valid'}
                          fullWidth
                          label="Insert Name*"
                          variant="filled"
                          onChange={(e) => {
                            let newObj = { ...cosuper, name: e.target.value }
                            setCosuper(newObj);

                            // Clear the error when the user starts typing
                          }}
                          sx={{ margin: '8px 0' }}
                        />
                        <TextField
                          error={modalerror[1]}
                          helperText={modalerror[1] && 'Surname not valid'}
                          fullWidth
                          label="Insert Surname*"
                          variant="filled"
                          onChange={(e) => {
                            let newObj = { ...cosuper, surname: e.target.value }
                            setCosuper(newObj);
                          }}
                          sx={{ margin: '8px 0' }}
                        />
                        <TextField
                          error={modalerror[2]}
                          helperText={modalerror[2] && 'Email not valid'}
                          fullWidth
                          label="Insert Email*"
                          variant="filled"
                          onChange={(e) => {
                            let newObj = { ...cosuper, email: e.target.value }
                            setCosuper(newObj);
                          }}
                          sx={{ margin: '8px 0' }}
                        />
                        <Button onClick={() => handleSubmitCoSuper()}>Add</Button>
                      </Box>
                    </Fade>
                  </Modal>
                </div>
                <Grid item xs={12}>
                  <CreatableSelect
                    isMulti
                    options={keywordList.filter((option) => !selectedKeywords.includes(option))}
                    getOptionLabel={(option) => option.name}
                    onChange={(selectedOptions) => {
                      let newArray = [...selectedKeywords, selectedOptions];
                      setSelectedKeywords(newArray)
                    }}
                    onCreateOption={(inputValue) => handleCreate(inputValue)}

                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" component="div">
                    Type list
                  </Typography>
                  <List dense>
                    {typeList.length !== 0 ? (
                      typeList.map((item) => (
                        <ListItem key={item}>
                          {item}
                          <IconButton
                            edge="end"
                            onClick={() => {
                              const newList = handleDelete(item, typeList);
                              setTypeList(newList);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItem>
                      ))
                    ) : (
                      <Typography>No type added</Typography>
                    )}
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Add type*"
                    error={typerror}
                    helperText={typerror ? "At least one type required" : ''}
                    onChange={(e) => {
                      setType(e.target.value);
                      setTyperror(false);
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => {
                            if (type !== '' && !typeList.includes(type)) {
                              const newList = [...typeList, type];
                              setTypeList(newList);
                              setType('');
                            }
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      ),
                    }}
                    sx={{ margin: '8px 0' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={tempcds}
                    getOptionLabel={(option) => option}
                    onChange={(event, values) => setCds(values)}
                    renderInput={(params) => (
                      <TextField
                        {...params} //prendo solo il nome del corso oggetto degree
                        variant="standard"
                        error={cdserror}
                        helperText={cdserror ? "Must select at least one cds" : ''}
                        label="Select CdS*"
                        placeholder="CdS"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <TextField
                    fullWidth
                    error={descerror}
                    helperText={descerror ? "Description required" : ''}
                    label="Description*"
                    multiline
                    rows={4}
                    variant="filled"
                    onChange={(e) => {
                      setDesc(e.target.value);
                      setDescerror(false);
                    }}
                    sx={{ margin: '8px 0' }}
                  />
                  <TextField
                    fullWidth
                    label="Required knowledge"
                    multiline
                    rows={4}
                    variant="filled"
                    onChange={(e) => setKnow(e.target.value)}
                    sx={{ margin: '8px 0' }}
                  />
                  <TextField
                    fullWidth
                    label="Notes"
                    multiline
                    rows={4}
                    variant="filled"
                    onChange={(e) => setNotes(e.target.value)}
                    sx={{ margin: '8px 0' }}
                  />
                </Grid>
                <Grid item xs={12} justifyContent="center" alignItems="center">
                  <FormLabel id="demo-radio-buttons-group-label">Level*</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Bachelor"
                    error={levelerror ? 'true' : 'false'}
                    name="radio-buttons-group"
                    row
                    onChange={(e) => setLevel(e.target.value)}
                    sx={{ justifyContent: 'center' }}
                  >
                    <FormControlLabel value="Bachelor" control={<Radio />} label="BSc" />
                    <FormControlLabel value="Master" control={<Radio />} label="MSc" />
                  </RadioGroup>
                  {levelerror && (
                    <Typography variant="caption" color="error">
                      Must select a level
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel id="date-label">Expiration Date*</FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      defaultValue={dayjs().add(1, 'day')}
                      minDate={dayjs()}
                      disablePast
                      views={['year', 'month', 'day']}
                      onChange={(e) => setDate(dayjs(e.target.value).format('DD-MM-YYYY'))}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} justifyContent='center' alignItems='center' style={{ display: 'flex', flexDirection: 'column' }}>
                  <Button type="submit" variant="contained" style={{ marginBottom: '2em' }} onClick={(e) => handleSubmit(e)} color="primary">
                    Submit form
                  </Button>
                  {formerror ? <label style={{ color: 'red', marginTop: '8px' }}>Try again, required fields are missing</label> : ''}
                </Grid>

              </Grid>
            </form>
          </Grid>
        </Container>
      }
    </>
  );
}

export default InsertProposal;
