import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { getAddress } from '../../utils/RetrieveAddress';
import './CreateProfile.css';
import { Link, useNavigate } from 'react-router-dom';

import ProgressBar from '../ProgressBar/ProgressBar';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import plantImg from '../../assets/plantImg.png';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import QRCode from 'qrcode.react';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { getCities, getProvinces } from './cityMapping';
import { subYears, isValid } from 'date-fns';

function CreateProfile({ formData, updateFormData, setHoldFormData }) {
  const { register, handleSubmit, formState, clearErrors, setError } =
    useForm();

  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  console.log(showDropdown);
  const [homeAddressList, setHomeAddressList] = useState([]);

  const [needsManualAddress, setNeedsManualAddress] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [manualProvince, setManualProvince] = useState('');
  const [manualCity, setManualCity] = useState('');

  const [existingAddress, setExistingAddress] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const generateQRCodeData = () => {
    const formDataQueryString = encodeURIComponent(JSON.stringify(formData));
    const dataToEncode = {
      url: `https://main.d3jrvl3sduvqep.amplifyapp.com/create-profile?formData=${formDataQueryString}`,
      formData: formData
    };
    console.log(JSON.stringify(dataToEncode));
    console.log(dataToEncode.url);
    return JSON.stringify(dataToEncode);
  };

  const handleInputChange = (e, fieldName) => {
    updateFormData({ ...formData, [fieldName]: e.target.value });
    clearErrors(fieldName);
  };

  const handleManualProvinceChange = (e) => {
    updateFormData({ ...formData, manualProvince: e.target.value });
    setManualProvince(e.target.value);
  };

  const handleManualCityChange = (e) => {
    updateFormData({ ...formData, manualCity: e.target.value });
    setManualCity(e.target.value);
  };

  const handleManualCheckboxChange = (e) => {
    setNeedsManualAddress(e.target.checked);
    updateFormData({ ...formData, needsManualAddress: e.target.checked });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const formDataParam = queryParams.get('formData');

    if (formDataParam) {
      const formDataFromQR = JSON.parse(formDataParam);
      setHoldFormData(formDataFromQR);
    }

    setNeedsManualAddress(formData.needsManualAddress);
    setManualProvince(formData.manualProvince);
    if (formData.manualProvince !== '') {
      setCityList([...getCities(formData.manualProvince)]);
    }

    if (formData.homeAddress !== '') {
      setExistingAddress(true);
      setInputValue(formData.homeAddress);
    }

    if (formData.manualCity !== '') {
      setManualCity(formData.manualCity);
    }
  }, [manualProvince, formData, setHoldFormData]);

  const handleAddressSearch = async (query) => {
    if (query === '' && existingAddress) {
    } else {
      setExistingAddress(false);
      setInputValue(query);
      if (query !== '') {
        console.log('find');
        const data = await getAddress(query);
        // console.log(data.Items);
        setHomeAddressList([...data.Items]);
      }
    }
  };

  const handleOptionClick = (option) => {
    if (option && option.Text && option.Description) {
      setInputValue(`${option.Text}, ${option.Description}`);
      setShowDropdown(false);
      updateFormData({
        ...formData,
        homeAddress: option.Text + ', ' + option.Description
      });
    } else {
      // Handle the case where option or its properties are null or undefined
      console.error('Invalid option:', option);
    }
  };

  const onSubmit = () => {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const numberRegex = /^\d{10,12}$/;
    const isValidNumber = numberRegex.test(formData.phoneNumber);
    const isValidEmail = emailRegex.test(formData.emailAddress);
    if (!isValidEmail) {
      setError('emailAddress', {
        type: 'manual',
        message: 'Please enter a valid email address'
      });
      return;
    }

    if (!isValidNumber) {
      setError('phoneNumber', {
        type: 'manual',
        message: 'Please enter a valid phone number'
      });
      return;
    }
    navigate('/verify-phone-number');
  };

  //   Date validation
  const minAgeDate = subYears(new Date(), 18);
  const [touched, setTouched] = useState(false);
  const maxDate = new Date().toISOString().split('T')[0];

  const isDateValid = (dateString) => {
    const selectedDate = new Date(dateString);
    return isValid(selectedDate) && selectedDate <= minAgeDate;
  };

  const inputStyle = {
    color: isValid(new Date(formData.birthDate)) ? 'black' : 'gray'
  };

  //   Phone validation
  const validatePhoneNumber = (phoneNumber) => {
    // Use a regular expression for phone number validation
    const phoneNumberRegex = /^\d{10,12}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='container'>
          <div className='progressBarContainer1'>
            {/* <p className="progressBarLabel1">Step 1 - Create a profile</p> */}
            <ProgressBar progress={1} /> {/* Pass the progress for this page */}
          </div>

          <div className='row subContainer'>
            <div className='headerContainer'>
              <img src={plantImg} alt='Your SVG' className='plantLogo' />
              <p className='header_label'>First, let's create your profile.</p>
            </div>

            <div className='insideContainer'>
              <div className='row grpContainer'>
                <div className='col textfield-wrapper mb-4'>
                  <TextField
                    color='success'
                    placeholder='First Name'
                    {...register('firstName', { required: true })}
                    value={formData.firstName}
                    onChange={(e) => handleInputChange(e, 'firstName')}
                    label='First Name'
                    variant='outlined'
                    className='form-control'
                    InputProps={{
                      style: { borderColor: '#09874E' } // Set your desired color
                    }}
                  />
                  <FormHelperText sx={{ color: 'crimson' }}>
                    {formState.errors.firstName && 'This field is required'}
                  </FormHelperText>
                </div>

                <div className='col textfield-wrapper mb-4'>
                  <TextField
                    color='success'
                    placeholder='Last Name'
                    {...register('lastName', { required: true })}
                    value={formData.lastName}
                    onChange={(e) => handleInputChange(e, 'lastName')}
                    label='Last Name'
                    variant='outlined'
                    className='form-control'
                  />
                  <FormHelperText sx={{ color: 'crimson' }}>
                    {formState.errors.lastName && 'This field is required'}
                  </FormHelperText>
                </div>
              </div>

              <div className='row grpContainer'>
                <div className='col mb-4'>
                  <TextField
                    color='success'
                    id='outlined-basic'
                    label='Date of Birth'
                    type='date'
                    variant='outlined'
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange(e, 'birthDate')}
                    onBlur={() => setTouched(true)} // Considered touched on blur
                    InputLabelProps={{
                      shrink: true
                    }}
                    className='form-control'
                    error={
                      touched &&
                      (formState.errors.birthDate ||
                        !isDateValid(formData.birthDate))
                    }
                    inputProps={{ max: maxDate, style: inputStyle }}
                  />
                  <FormHelperText sx={{ color: 'crimson' }}>
                    {touched &&
                      formState.errors.birthDate &&
                      'This field is required'}
                    {touched &&
                      !formState.errors.birthDate &&
                      !isDateValid(formData.birthDate) &&
                      'You must be at least 18 years old'}
                  </FormHelperText>
                </div>

                <div className='col mb-4'>
                  <TextField
                    color='success'
                    placeholder='Email Address'
                    {...register('emailAddress', { required: true })}
                    value={formData.emailAddress}
                    onChange={(e) => handleInputChange(e, 'emailAddress')}
                    label='Email Address'
                    variant='outlined'
                    className='form-control '
                  />
                  <FormHelperText sx={{ color: 'crimson' }}>
                    {formState.errors.emailAddress &&
                      'Please enter a valid email address'}
                  </FormHelperText>
                </div>
              </div>

              <div className='row grpContainer'>
                <div className='col mb-4'>
                  <TextField
                    color='success'
                    placeholder='Phone Number'
                    {...register('phoneNumber', {
                      required: true,
                      pattern: /^[0-9]{10}$/ // Allow only 10 digits
                    })}
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      // Remove non-numeric characters and limit to 10 digits
                      const numericValue = e.target.value
                        .replace(/[^0-9]/g, '')
                        .slice(0, 10);
                      handleInputChange(
                        { target: { value: numericValue } },
                        'phoneNumber'
                      );
                    }}
                    label='Phone Number'
                    variant='outlined'
                    className='form-control'
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*' // Fallback pattern for browsers that do not support inputMode
                    }}
                  />
                  <FormHelperText sx={{ color: 'crimson' }}>
                    {formState.errors.phoneNumber &&
                      'Please enter a valid phone number with exactly 10 digits'}
                  </FormHelperText>
                </div>
              </div>

              {!needsManualAddress ? (
                <>
                  <Autocomplete
                    clearOnEscape
                    filterOptions={(x) => x}
                    options={homeAddressList}
                    getOptionLabel={(option) =>
                      `${option.Text}, ${option.Description}`
                    }
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) =>
                      handleAddressSearch(newInputValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Home Address'
                        variant='outlined'
                        fullWidth
                        color='success'
                      />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      `${option.Text}, ${option.Description}` === value
                    }
                    onChange={(event, newValue) => handleOptionClick(newValue)}
                    className='mb-4 '
                  />{' '}
                  <FormHelperText sx={{ color: 'crimson' }}>
                    {formState.errors.address && 'This field is required'}
                  </FormHelperText>
                </>
              ) : (
                <div></div>
              )}
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox color='success' />}
                  checked={needsManualAddress}
                  label="Can't find address? Needs to enter the address manually"
                  onChange={(e) => handleManualCheckboxChange(e)}
                  style={{
                    // padding: '1em 0',
                    fontSize: '1em',
                    lineHeight: '1.5',
                    marginBottom: '1.5rem'
                  }}
                />
              </FormGroup>

              {needsManualAddress ? (
                <>
                  <div className='row grpContainer'>
                    <div className='col-12 col-md-8 mb-4'>
                      <TextField
                        color='success'
                        placeholder='Address line'
                        {...register('manualAddressLine', { required: true })}
                        value={formData.manualAddressLine}
                        onChange={(e) =>
                          handleInputChange(e, 'manualAddressLine')
                        }
                        label='Address line'
                        variant='outlined'
                        className='form-control'
                      />
                      <FormHelperText sx={{ color: 'crimson' }}>
                        {formState.errors.manualAddressLine &&
                          'This field is required'}
                      </FormHelperText>
                    </div>
                    <div className='col-12 col-md-4 mb-4'>
                      <TextField
                        color='success'
                        placeholder='Postal code'
                        {...register('manualPostalCode', { required: true })}
                        value={formData.manualPostalCode}
                        onChange={(e) =>
                          handleInputChange(e, 'manualPostalCode')
                        }
                        label='Postal code'
                        variant='outlined'
                        className='form-control'
                      />
                      <FormHelperText sx={{ color: 'crimson' }}>
                        {formState.errors.manualPostalCode &&
                          'This field is required'}
                      </FormHelperText>
                    </div>
                  </div>
                  <div className='row grpContainer'>
                    <div className='col-12 col-md-6 mb-4 pt-0'>
                      <FormControl fullWidth>
                        <InputLabel color='success' id='province-label'>
                          Province
                        </InputLabel>
                        <Select
                          labelId='province-label'
                          id='manual-province'
                          value={manualProvince}
                          label='Province'
                          color='success'
                          onChange={(e) => handleManualProvinceChange(e)}
                        >
                          {getProvinces().map((p) => (
                            <MenuItem key={p} value={p}>
                              {p}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className='col-12 col-md-6 mb-4 pt-0'>
                      <FormControl fullWidth>
                        <InputLabel color='success' id='city-label'>
                          City
                        </InputLabel>
                        <Select
                          labelId='city-label'
                          id='manual-city'
                          value={manualCity}
                          label='City'
                          color='success'
                          onChange={(e) => handleManualCityChange(e)}
                        >
                          {cityList.map((p) => (
                            <MenuItem key={p} value={p}>
                              {p}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </>
              ) : (
                <div></div>
              )}
            </div>
            <div className='btn-wrapper'>
              {/* <Link to="/verify-phone-number" className="ABC-btn btn-orange text-decoration-none">
                                Submit
                            </Link> */}
              <button
                type='submit'
                className='ABC-btn btn-orange text-decoration-none'
                style={{ fontWeight: '700', fontSize: '18px' }}
              >
                Continue
              </button>
              <Link
                to='/'
                className='ABC-btn btn-white text-decoration-none'
                style={{ fontWeight: '700', fontSize: '18px' }}
              >
                Back
              </Link>
            </div>

            <div
              className='qrcodestyler'
              style={{ alignItems: 'center', cursor: 'pointer' }}
              onClick={handleOpenDialog}
            >
              <QrCodeScannerIcon
                src='path/to/your/qr-code-icon.png'
                alt='QR Code Icon'
                style={{ marginRight: '10px' }}
              />
              <p className='qrcodetext' style={{ margin: 0, fontSize: '14px' }}>
                Want to continue filling the application on your phone?{' '}
                <span style={{ textDecoration: 'underline' }}>Click here</span>.
              </p>
            </div>

            {/* Dialog for displaying QR code */}
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              style={{ borderRadius: '10px' }}
            >
              <DialogTitle style={{ textAlign: 'center' }}>
                Scan QR Code
              </DialogTitle>
              <DialogContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <QRCode
                  value={generateQRCodeData()}
                  renderAs='svg'
                  size={256}
                />
                <DialogContentText
                  style={{ textAlign: 'center', marginTop: '10px' }}
                >
                  Click the button below to close this pop-up.
                </DialogContentText>
              </DialogContent>
              <DialogActions style={{ justifyContent: 'center' }}>
                <Button
                  onClick={handleCloseDialog}
                  variant='contained'
                  color='primary'
                  style={{
                    backgroundColor: '#ED6453',
                    color:
                      'linear-gradient(to right, #e31937, #a82465, #5236ab);',
                    marginBottom: '10px'
                  }}
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateProfile;
