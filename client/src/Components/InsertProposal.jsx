import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import {Box} from '@mui/material';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import RadioGroup from '@mui/material/RadioGroup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Radio from '@mui/material/Radio';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import { DatePicker } from '@mui/x-date-pickers'
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AddIcon from '@mui/icons-material/Add';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {FormControl, InputLabel, Input, FormControlLabel, FormLabel} from '@mui/material';




const uid = (function () {
  let id = 0;
  return function () {
    id++;
    return id;
  };
})();

function InsertProposal(props) {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [cosuper, setCosuper] = useState('');
  const [csvList, setCsvList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [keylist, setKeylist] = useState([]);
  const [cds,setCds]=useState('');
  const [type, setType] = useState('');
  const [typeList, setTypeList] = useState([]);
  const [sup, setSup] = useState('');
  const itemList = ['email1', 'email2', 'email3']; //supervisor list
  const tempcsv = ['csv1', 'csv2', 'csv3'];
  const tempcds = ['gestionale', 'informatica', 'elettronica', 'ambientale'];
  const [date, setDate] = useState('');
  const [level, setLevel] = useState('');
  const [notes, setNotes] = useState('');
  const [desc, setDesc] = useState('');
  const [know, setKnow] = useState(''); // required knowledge


  const handleSelection=(e)=>{
    //e  is input value
    setSup(e);
    console.log(e);
  }

  const handleDelete=(item, list)=>{
    let newList=list.filter((e)=>e!=item);
    return newList;
  }
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Add your validation logic here and update the state
    if (keylist.length === 0) {
      setTitleError('Keywords are required');
      setValidated(false);
    } else {
      setTitleError('');
    }

    if (csvList.length === 0) {
      // Update state and error message for co-supervisor
      setCsvList([]);
      // Handle other validation and error messages as needed

      setValidated(false);
    }

    if (typeList.length === 0) {
      // Update state and error message for type
      setTypeList([]);
      // Handle other validation and error messages as needed

      setValidated(false);
    }

    if (sup === '') {
      // Update state and error message for supervisor
      setSup('No supervisor selected');
      // Handle other validation and error messages as needed

      setValidated(false);
    }

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
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
                fullWidth
                label="Insert Title*"
                variant="filled"
                sx={{ margin: '8px 0' }} 
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="Select a supervisor"
                clearOnEscape
                options={itemList}
                onChange={(event, newValue) => {
                  setSup(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select a supervisor*" variant="standard" />
                )}
                sx={{ margin: '8px 0' }} 
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="div">
                Co-Supervisors list
              </Typography>
              <List dense>
                {csvList.length !== 0 ? (
                  csvList.map((item) => (
                    <ListItem key={item}>
                      {item}
                      <IconButton
                        edge="end"
                        onClick={() => {
                          const newList = handleDelete(item, csvList);
                          setCsvList(newList);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))
                ) : (
                  <Typography>No co-supervisors added</Typography>
                )}
              </List>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="Select co-supervisors"
                clearOnEscape
                options={tempcsv}
                onChange={(event, newValue) => {
                  if (newValue !== null && !csvList.includes(newValue)) {
                    const newList = [...csvList, newValue];
                    setCsvList(newList);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Add supervisors*" variant="standard" />
                )}
                sx={{ margin: '8px 0' }} 
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
                onChange={(e) => setKeyword(e.target.value)}
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
                onChange={(e) => setType(e.target.value)}
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
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Autocomplete
                id="Select a CdS"
                clearOnEscape
                options={tempcds}
                onChange={(event, newValue) => {
                  setCds(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select a CdS*" variant="standard" />
                )}
                sx={{ margin: '8px 0' }} 
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                fullWidth
                label="Required knowledge*"
                multiline
                rows={4}
                variant="filled"
                onChange={(e) => setKnow(e.target.value)}
                sx={{ margin: '8px 0' }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel id="demo-radio-buttons-group-label">Level*</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="BSc"
                name="radio-buttons-group"
                row
                onChange={(e) => setLevel(e.target.value)}
              >
                <FormControlLabel value="BSc" control={<Radio />} label="BSc" />
                <FormControlLabel value="MSc" control={<Radio />} label="MSc" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
              <FormLabel id="date-label">Expiration Date*</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  defaultValue={dayjs()}
                  minDate={dayjs().add(1, 'day')}
                  disablePast
                  views={['year', 'month', 'day']}
                  onChange={(e) => setDate(dayjs(e.target.value).format('DD-MM-YYYY'))}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit form
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
  }  

export default InsertProposal;