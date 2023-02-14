import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styles from '@/styles/components/searchbar.module.css';
import { data } from '../../utils/searchJson';

import {
  TextField,
  Button,
  ThemeProvider,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  Skeleton,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tabs,
} from '@mui/material';
import { convertString } from '../../utils/helpers';
import MuiPhoneNumber from 'material-ui-phone-number';
import LoadingButton from '@mui/lab/LoadingButton';
import Close from '@mui/icons-material/Close';
import emailjs from '@emailjs/browser';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 80,
    },
  },
};

export default function Searchbar() {
  const [type, setType] = useState('business');
  const [selectedDept, setSelectedDept] = useState(' ');
  const [selectedDest, setSelectedDest] = useState(' ');
  const [route, setRoute] = useState();
  const [deptdate, setDeptDate] = useState();
  const [arriveDate, setArriveDate] = useState();
  const [open, setOpen] = useState();
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const [value, setValue] = React.useState('1');

  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };

  const [details, setDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    returnDate: '',
    deptDate: '',
    budget: '',
    dept: '',
    dest: '',
    msg: '',
  });

  const handleChange = (type, value) => {
    if (type == 'dep') {
      setSelectedDept(value);
    } else if (type == 'dest') {
      setSelectedDest(value);
    } else if (type == 'phone') {
      console.log(value);
      setDetails({ ...details, phone: value });
    }
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  function generateLink(dept, dest) {
    let deptCode = '';
    let destCode = '';

    if (dept.length > 3 && dest.length > 3) {
      const _dept = dept.split('-')[1].trim().split('');
      deptCode = [_dept[1], _dept[2], _dept[3]].join('');

      const _dest = dest.split('-')[1].trim().split('');
      destCode = [_dest[1], _dest[2], _dest[3]].join('');

      setRoute(`/fares?dept=${deptCode}&dest=${destCode}`);
      return;
    } else if (dept.length > 3) {
      const _dept = dept.split('-')[1].trim().split('');
      deptCode = [_dept[1], _dept[2], _dept[3]].join('');

      setRoute(`/fares?dept=${deptCode}&dest=all`);
    } else if (dest.length > 3) {
      const _dest = dest.split('-')[1].trim().split('');
      destCode = [_dest[1], _dest[2], _dest[3]].join('');

      setRoute(`/fares?dept=all&dest=${destCode}`);
    }

    // console.log(deptCode);
    // console.log(destCode);
  }

  const handleSearch = () => {
    if (arriveDate && deptdate && selectedDept && selectedDest) {
      setOpen(true);
    } else {
      setShowDialog({
        title: 'Error',
        msg: 'Kindly fill the Form.12345',
      });
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    if (arriveDate && deptdate && selectedDept && selectedDest) {
      emailjs
        .send(
          'service_1d21p96',
          'template_mqvxf7a',
          {
            name: details.name,
            email: details.email,
            phone: details.phone,
            returnDate: arriveDate,
            deptDate: deptdate,
            dept: selectedDept,
            dest: selectedDest,
          },
          'tL_Vpyj5WxQRqs6ec',
        )
        .then((res) => {
          console.log(res);
          setShowDialog({
            title: 'Successfull',
            msg: 'Inquiry sent successfully, We will call you for further processing.',
          });
          setForm({
            name: '',
            email: '',
            phone: '',
            returnDate: '',
            deptDate: '',
            dept: '',
            dest: '',
            msg: '',
          });
          Router.push(route);
        })
        .catch((err) => {
          console.log(err);
          setShowDialog({
            title: 'Something went wrong',
            msg: 'Inquiry not sent.',
          });
          setDetails({
            name: '',
            email: '',
            phone: '',
          });
          Router.push(route);
          setOpen(false);
        });
    } else {
      setShowDialog({
        title: 'Error',
        msg: 'Kindly fill the Form.',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    generateLink(selectedDept, selectedDest);
  }, [selectedDest, selectedDept]);

  return (
    <div className={styles.bannerContainer}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange1}
          aria-label="basic tabs example"
        >
          <Tab label="Flights" {...a11yProps(0)} />
          <Tab label="Hotels" {...a11yProps(1)} />
          <Tab label="Hotels + Flights" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <div className={styles.banner__form}>
          <div className={styles.flexVerical}>
            <Autocomplete
              fullWidth
              sx={{ width: '280px' }}
              size="small"
              id="free-solo-2-demo"
              disableClearable
              autoHighlight
              // onFocusCapture={() => getData()}
              options={
                data
                  ? data.map(
                      (deptt, i) =>
                        ` ${convertString(deptt.city)} - (${
                          deptt.airportCode
                        }) - ${convertString(deptt.airport)} - 
                    ${convertString(deptt.country)}`,
                    )
                  : ['']
              }
              onChange={(event, value) => {
                setSelectedDept(value);
              }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  label="Departure"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
            <Autocomplete
              fullWidth
              // freeSolo
              sx={{ width: '280px' }}
              size="small"
              id="free-solo-2-demo"
              autoHighlight
              disableClearable
              // onFocusCapture={() => getData()}
              options={
                data
                  ? data.map(
                      (destt, i) =>
                        `${convertString(destt.city)} - (${
                          destt.airportCode
                        }) - ${convertString(destt.airport)} - ${convertString(
                          destt.country,
                        )}`,
                    )
                  : ['']
              }
              onChange={(event, value) => {
                setSelectedDest(value);
              }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  label="Destination"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
          </div>
          <div className={styles.flexVerical}>
            <TextField
              size="small"
              label="Departure Date"
              type="date"
              sx={{ width: '280px' }}
              onChange={(e) => setDeptDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              sx={{ width: '280px' }}
              size="small"
              onChange={(e) => setArriveDate(e.target.value)}
              label="Return Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className={styles.countsAndType}>
            <FormControl>
              <InputLabel
                id="demo-simple-select-label"
                size="small"
                sx={{ width: '280px' }}
              >
                Type
              </InputLabel>
              <Select
                sx={{ width: '280px' }}
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={handleChangeType}
              >
                <MenuItem value="economy">Economy</MenuItem>
                <MenuItem value="business">Business</MenuItem>
              </Select>
            </FormControl>
            <div className={styles.counts}>
              <TextField
                onChange={(e) => handleChange('infants', e.target.value)}
                type="number"
                label="Infants"
                size="small"
                sx={{ width: '80px' }}
              />
              <TextField
                onChange={(e) => handleChange('childs', e.target.value)}
                type="number"
                label="Childs"
                size="small"
                sx={{ width: '80px' }}
              />
              <TextField
                onChange={(e) => handleChange('adults', e.target.value)}
                type="number"
                label="Adults"
                size="small"
                sx={{ width: '80px' }}
              />
            </div>
          </div>
          {/* <Link href={route || '/'}> */}
          <Button
            onClick={() => handleSearch()}
            variant="contained"
            sx={{ height: 'fit-content' }}
            disableElevation
          >
            Search
          </Button>
          {/* </Link> */}

          <Dialog open={open}>
            <div className={styles.closeBtn}>
              <IconButton onClick={() => setOpen(false)}>
                <Close />
              </IconButton>
            </div>
            <div className={styles.dialog__inquiry}>
              <h1 style={{ margin: '0 0 20px 0', width: '100%' }}>
                Enter Your Details
              </h1>
              <div className={styles.dialog__form}>
                <TextField
                  label="Name"
                  onChange={(e) =>
                    setDetails({ ...details, name: e.target.value })
                  }
                />
                <TextField
                  label="Email"
                  onChange={(e) =>
                    setDetails({ ...details, email: e.target.value })
                  }
                />
                <MuiPhoneNumber
                  value={form.phone}
                  size="small"
                  defaultCountry={'gb'}
                  onChange={(value) => handleChange('phone', value)}
                  variant="outlined"
                  label="Phone Number"
                />
              </div>
              <LoadingButton
                fullWidth
                variant="contained"
                sx={{ marginTop: '15px' }}
                onClick={() => handleSubmit()}
              >
                Submit
              </LoadingButton>
            </div>
          </Dialog>
          <Dialog
            open={showDialog}
            keepMounted
            onClose={() => showDialog(false)}
          >
            <DialogTitle>{showDialog.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{showDialog.msg}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowDialog(false)}>OK</Button>
            </DialogActions>
          </Dialog>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={styles.banner__form}>
          <div className={styles.flexVerical}>
            <Autocomplete
              fullWidth
              sx={{ width: '280px' }}
              size="small"
              id="free-solo-2-demo"
              disableClearable
              autoHighlight
              // onFocusCapture={() => getData()}
              options={
                data
                  ? data.map(
                      (deptt, i) =>
                        ` ${convertString(deptt.city)} - (${
                          deptt.airportCode
                        }) - ${convertString(deptt.airport)} - 
                    ${convertString(deptt.country)}`,
                    )
                  : ['']
              }
              onChange={(event, value) => {
                setSelectedDept(value);
              }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  label="Departure"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
            <Autocomplete
              fullWidth
              // freeSolo
              sx={{ width: '280px' }}
              size="small"
              id="free-solo-2-demo"
              autoHighlight
              disableClearable
              // onFocusCapture={() => getData()}
              options={
                data
                  ? data.map(
                      (destt, i) =>
                        `${convertString(destt.city)} - (${
                          destt.airportCode
                        }) - ${convertString(destt.airport)} - ${convertString(
                          destt.country,
                        )}`,
                    )
                  : ['']
              }
              onChange={(event, value) => {
                setSelectedDest(value);
              }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  label="Destination"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
          </div>
          <div className={styles.flexVerical}>
            <TextField
              size="small"
              label="Departure Date"
              type="date"
              sx={{ width: '280px' }}
              onChange={(e) => setDeptDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              sx={{ width: '280px' }}
              size="small"
              onChange={(e) => setArriveDate(e.target.value)}
              label="Return Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className={styles.countsAndType}>
            <FormControl>
              <InputLabel
                id="demo-simple-select-label"
                size="small"
                sx={{ width: '280px' }}
              >
                Type
              </InputLabel>
              <Select
                sx={{ width: '280px' }}
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={handleChangeType}
              >
                <MenuItem value="economy">Economy</MenuItem>
                <MenuItem value="business">Business</MenuItem>
              </Select>
            </FormControl>
            <div className={styles.counts}>
              <TextField
                onChange={(e) => handleChange('infants', e.target.value)}
                type="number"
                label="Infants"
                size="small"
                sx={{ width: '80px' }}
              />
              <TextField
                onChange={(e) => handleChange('childs', e.target.value)}
                type="number"
                label="Childs"
                size="small"
                sx={{ width: '80px' }}
              />
              <TextField
                onChange={(e) => handleChange('adults', e.target.value)}
                type="number"
                label="Adults"
                size="small"
                sx={{ width: '80px' }}
              />
            </div>
          </div>
          {/* <Link href={route || '/'}> */}
          <Button
            onClick={() => handleSearch()}
            variant="contained"
            sx={{ height: 'fit-content' }}
            disableElevation
          >
            Search
          </Button>
          {/* </Link> */}

          <Dialog open={open}>
            <div className={styles.closeBtn}>
              <IconButton onClick={() => setOpen(false)}>
                <Close />
              </IconButton>
            </div>
            <div className={styles.dialog__inquiry}>
              <h1 style={{ margin: '0 0 20px 0', width: '100%' }}>
                Enter Your Details
              </h1>
              <div className={styles.dialog__form}>
                <TextField
                  label="Name"
                  onChange={(e) =>
                    setDetails({ ...details, name: e.target.value })
                  }
                />
                <TextField
                  label="Email"
                  onChange={(e) =>
                    setDetails({ ...details, email: e.target.value })
                  }
                />
                <MuiPhoneNumber
                  value={form.phone}
                  size="small"
                  defaultCountry={'gb'}
                  onChange={(value) => handleChange('phone', value)}
                  variant="outlined"
                  label="Phone Number"
                />
              </div>
              <LoadingButton
                fullWidth
                variant="contained"
                sx={{ marginTop: '15px' }}
                onClick={() => handleSubmit()}
              >
                Submit
              </LoadingButton>
            </div>
          </Dialog>
          <Dialog
            open={showDialog}
            keepMounted
            onClose={() => showDialog(false)}
          >
            <DialogTitle>{showDialog.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{showDialog.msg}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowDialog(false)}>OK</Button>
            </DialogActions>
          </Dialog>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className={styles.banner__form}>
          <div className={styles.flexVerical}>
            <Autocomplete
              fullWidth
              sx={{ width: '280px' }}
              size="small"
              id="free-solo-2-demo"
              disableClearable
              autoHighlight
              // onFocusCapture={() => getData()}
              options={
                data
                  ? data.map(
                      (deptt, i) =>
                        ` ${convertString(deptt.city)} - (${
                          deptt.airportCode
                        }) - ${convertString(deptt.airport)} - 
                    ${convertString(deptt.country)}`,
                    )
                  : ['']
              }
              onChange={(event, value) => {
                setSelectedDept(value);
              }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  label="Departure"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
            <Autocomplete
              fullWidth
              // freeSolo
              sx={{ width: '280px' }}
              size="small"
              id="free-solo-2-demo"
              autoHighlight
              disableClearable
              // onFocusCapture={() => getData()}
              options={
                data
                  ? data.map(
                      (destt, i) =>
                        `${convertString(destt.city)} - (${
                          destt.airportCode
                        }) - ${convertString(destt.airport)} - ${convertString(
                          destt.country,
                        )}`,
                    )
                  : ['']
              }
              onChange={(event, value) => {
                setSelectedDest(value);
              }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  label="Destination"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
          </div>
          <div className={styles.flexVerical}>
            <TextField
              size="small"
              label="Departure Date"
              type="date"
              sx={{ width: '280px' }}
              onChange={(e) => setDeptDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              sx={{ width: '280px' }}
              size="small"
              onChange={(e) => setArriveDate(e.target.value)}
              label="Return Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className={styles.countsAndType}>
            <FormControl>
              <InputLabel
                id="demo-simple-select-label"
                size="small"
                sx={{ width: '280px' }}
              >
                Type
              </InputLabel>
              <Select
                sx={{ width: '280px' }}
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={handleChangeType}
              >
                <MenuItem value="economy">Economy</MenuItem>
                <MenuItem value="business">Business</MenuItem>
              </Select>
            </FormControl>
            <div className={styles.counts}>
              <TextField
                onChange={(e) => handleChange('infants', e.target.value)}
                type="number"
                label="Infants"
                size="small"
                sx={{ width: '80px' }}
              />
              <TextField
                onChange={(e) => handleChange('childs', e.target.value)}
                type="number"
                label="Childs"
                size="small"
                sx={{ width: '80px' }}
              />
              <TextField
                onChange={(e) => handleChange('adults', e.target.value)}
                type="number"
                label="Adults"
                size="small"
                sx={{ width: '80px' }}
              />
            </div>
          </div>
          {/* <Link href={route || '/'}> */}
          <Button
            onClick={() => handleSearch()}
            variant="contained"
            sx={{ height: 'fit-content' }}
            disableElevation
          >
            Search
          </Button>
          {/* </Link> */}

          <Dialog open={open}>
            <div className={styles.closeBtn}>
              <IconButton onClick={() => setOpen(false)}>
                <Close />
              </IconButton>
            </div>
            <div className={styles.dialog__inquiry}>
              <h1 style={{ margin: '0 0 20px 0', width: '100%' }}>
                Enter Your Details
              </h1>
              <div className={styles.dialog__form}>
                <TextField
                  label="Name"
                  onChange={(e) =>
                    setDetails({ ...details, name: e.target.value })
                  }
                />
                <TextField
                  label="Email"
                  onChange={(e) =>
                    setDetails({ ...details, email: e.target.value })
                  }
                />
                <MuiPhoneNumber
                  value={form.phone}
                  size="small"
                  defaultCountry={'gb'}
                  onChange={(value) => handleChange('phone', value)}
                  variant="outlined"
                  label="Phone Number"
                />
              </div>
              <LoadingButton
                fullWidth
                variant="contained"
                sx={{ marginTop: '15px' }}
                onClick={() => handleSubmit()}
              >
                Submit
              </LoadingButton>
            </div>
          </Dialog>
          <Dialog
            open={showDialog}
            keepMounted
            onClose={() => showDialog(false)}
          >
            <DialogTitle>{showDialog.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{showDialog.msg}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowDialog(false)}>OK</Button>
            </DialogActions>
          </Dialog>
        </div>
      </TabPanel>
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
