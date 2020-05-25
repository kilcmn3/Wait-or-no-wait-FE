import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MaskedInput from 'react-text-mask';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const TextMaskCustom = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};

const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='http://localhost:4000/'>
        Wait-or-No-Wait
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    restaurant_name: '',
    restaurant_contact: '',
    address1: '',
    city: '',
    state: '',
    zip: '',
  });

  useEffect(() => {
    let id = localStorage.getItem('owner');
    fetch('http://localhost:3000/owners/' + id)
      .then((response) => response.json())
      .then((data) => {
        let address = data.restaurant_location.split(',');
        let zip = address[address.length - 1].split(' ');
        setValues({
          email: data.username,
          password: data.password,
          confirmPassword: data.confirmPassword,
          restaurant_name: data.restaurant_name,
          restaurant_contact: data.restaurant_contact,
          address1: address[0],
          city: address[1],
          state: zip[0],
          zip: zip[1],
        });
      });
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const location =
      values.address1 +
      ', ' +
      values.city +
      ',' +
      values.state +
      ' ' +
      values.zip;

    const owner = {
      username: values.email,
      password: values.password,
      restaurant_name: values.restaurantName,
      restaurant_contact: values.restaurantContact,
      restaurant_location: location,
    };
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountBoxIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Profile
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                value={values.email}
                name='email'
                autoComplete='email'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                value={values.password}
                id='password'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                value={values.password}
                type='password'
                id='confirmPassword'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='restaurantName'
                label='Restaurant Name'
                value={values.restaurant_name}
                name='restaurantName'
                autoComplete='restaurantName'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='restaurantContact'
                label='Restaurant Contact'
                autoComplete='restaurantContact'
                name='restaurantContact'
                InputProps={{
                  inputComponent: TextMaskCustom,
                  value: values.restaurant_contact,
                  onChange: handleChange,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='address1'
                label='Address line'
                value={values.address1}
                name='address1'
                autoComplete='address1'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='city'
                label='City'
                value={values.city}
                name='city'
                autoComplete='city'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='state'
                label='State'
                value={values.state}
                name='state'
                autoComplete='state'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='zip'
                label='Zip/Postal code'
                value={values.zip}
                name='zip'
                autoComplete='zip'
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Profile;
