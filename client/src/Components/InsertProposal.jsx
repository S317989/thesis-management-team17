import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Radio from '@mui/material/Radio';

import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import { DatePicker } from '@mui/x-date-pickers';
import ListItem from '@mui/material/ListItem';
import ProposalsAPI from '../APIs/ProposalsApi';

import AddIcon from '@mui/icons-material/Add';

import { FormControlLabel, FormLabel } from '@mui/material';

function InsertProposal(props) {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [keyerror, setKeyerror] = useState(false);
  const [csvList, setCsvList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [keylist, setKeylist] = useState([]);
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
  const [level, setLevel] = useState('BSc');
  const [success, setSuccess] = useState(false);
  const [grouplist, setGrouplist] = useState([]);
  const [notes, setNotes] = useState('');
  const [desc, setDesc] = useState('');
  const [know, setKnow] = useState(''); // required knowledge


  const supervisors = props.teacherList;
  const svList = supervisors ? supervisors.map((e) => `${e.email}, ${e.name}, ${e.surname}, ${e.groupname}`) : []; //supervisor list retrieved from db



  const cosv = props.csvlist;
  const tempcsv = cosv ? cosv.map((e) => `${e.email}, ${e.name}, ${e.surname}, ${e.groupname}`) : []; //cosupervisor list retrieved from db


  const degrees = props.degreeList;
  const tempcds = degrees ? degrees.map((e) => e.degree) : []; //list of courses retrieved by db from CoSupervisor Table

  const handleTagsChange = (event, values) => {

    let arr = values.map((item) => {
      let itemArray = item.split(',');
      let emailValue = itemArray[0]; //email value
      let groupValue = itemArray[3]; //groupNAme
      let newArray = [...grouplist, groupValue];
      let newEmailArray = [...csvList, emailValue];
      setGrouplist(newArray);//aggiorno la lista di gruppi
      setCsvList(newEmailArray); //aggiorno la lista di email dei prof supervisor e cosupervisor
    })
    // console.log(values)
  };

  const handleDelete = (item, list) => {
    let newList = list.filter((e) => e !== item);
    return newList;
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


    try {
      // Make the API call
      const response = await ProposalsAPI.newThesisProposal(
        title,
        sup,
        csvList.join(','),//trasformo in stringhe concatenate da comma
        grouplist.join(','),
        keylist.join(','),
        type.join(','),
        desc,
        know,
        notes,
        date,
        level,
        cds
      );
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
                    options={tempcsv}
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
                <Grid item xs={12}>
                  <Typography variant="h6" component="div">
                    Keywords list
                  </Typography>
                  <List dense>
                    {keylist.length !== 0 ? (
                      keylist.map((item) => (
                        <ListItem key={item}>
                          {item}
                          <IconButton
                            edge="end"
                            onClick={() => {
                              const newList = handleDelete(item, keylist);
                              setKeylist(newList);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItem>
                      ))
                    ) : (
                      <Typography>No keywords added</Typography>
                    )}
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Add keywords*"
                    error={keyerror}
                    helperText={keyerror ? "At least one keyword required" : ''}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                      setKeyerror(false);
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => {
                            if (keyword !== '' && !keylist.includes(keyword)) {
                              const newList = [...keylist, keyword];
                              setKeylist(newList);
                              setKeyword('');
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
                    onChange={(e) => setDesc(e.target.value)}
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
                    defaultValue="BSc"
                    error={levelerror ? 'true' : 'false'}
                    name="radio-buttons-group"
                    row
                    onChange={(e) => setLevel(e.target.value)}
                    sx={{ justifyContent: 'center' }}
                  >
                    <FormControlLabel value="BSc" control={<Radio />} label="BSc" />
                    <FormControlLabel value="MSc" control={<Radio />} label="MSc" />
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
