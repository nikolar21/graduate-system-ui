import {useState} from 'react';
import loginPageImage from '../assets/login-page.jpg';
import { useForm, Controller } from 'react-hook-form';
import {Alert, Button, Snackbar, TextField} from "@mui/material";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {UserContext} from '../state-management/store/UserContext';
import {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import axiosClient from "../api/axiosClient";

const USER_LOGIN_PAGE = '/api/auth/login'

const LoginPage = () => {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useContext(UserContext);
  const [open, setOpen] = useState(false);

  let schema = yup.object().shape({
    username: yup.string(),
    email: yup.string().email(),
  });

  const { handleSubmit, control, formState: {errors} } = useForm({
    defaultValues: {
      username: "",
      password: ""
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      let response = await axiosClient.post(USER_LOGIN_PAGE, JSON.stringify(data));
      setUserContext({
        isLoggedIn: true,
        username: response.data.username,
        id: response.data.id,
        roles: response.data.roles
      });
      sessionStorage.setItem('jwt-token', response.data.token);
      navigate('/', {replace: true});
    } catch (err) {
      showWrongCredentials();
      console.log(err);
    }
  }

  const showWrongCredentials = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return(
    <div className="form-page-container">
      <div className="form-container">
        <h4>Use existing account</h4><br/>
        <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Username:</label><br/>
          <Controller name="username" control={control}
            render={({field}) => (
            <TextField {...field} className="login-input-controller" id="username standard-basic" label="Username" variant="standard" type="text"/>
          )}/>
          <br/><br/><br/>
          <label>Password:</label><br/>
          <Controller name="password" control={control}
            render={({field}) => (
             <TextField {...field} className="login-input-controller" id="password standard-basic" label="Password" variant="standard" type="password"/>
          )}/><br/><br/>
          <Button variant="contained" type="submit" className="login-button">Sign in</Button>
        </form><br/><br/><br/>
        <h4>Or you can sign in with the following:</h4><br/><br/>
        <FacebookIcon style={{height: "40px", width: "40px"}}/>
        <GoogleIcon style={{height: "40px", width: "40px"}}/>
        <TwitterIcon style={{height: "40px", width: "40px"}}/>
        <LinkedInIcon style={{height: "40px", width: "40px"}}/>
        <br/><br/><br/><br/><br/><br/>

      </div>
      <div className="image-container">
        <img src={loginPageImage} alt="Login"/>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Wrong credentials entered
        </Alert>
      </Snackbar>
    </div>
  )
}

export default LoginPage;