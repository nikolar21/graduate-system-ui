import {useEffect, useState} from "react";
import {faCheck, faInfo, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Alert, Button, MenuItem, Select, Snackbar, TextField} from "@mui/material";
import {useMatch} from "react-router-dom";
import { ROLE_USER, ROLE_ADMIN, ROLE_INSPECTOR } from "../utils/globalVars";
import axiosClient from '../api/axiosClient';
import registerPageImage from '../assets/register-page.jpg';

// Contains 1-50 characters.
const NAMES_REGEX = /^(?=.{1,50}$)[a-z]+(?:['_.\\s][a-z]+)*$/i;
// Contains 3 - 16 characters and numbers
const USERNAME_REGEX = /^[a-z0-9_-]{3,16}$/i
// Contains text before and after @ symbol and ends with '.' text
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
// Contains at least eight characters, at least one number and both lower and uppercase letters and special characters
const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i

const REGISTER_PAGE_URL='/api/users';
const ADMIN_REGISTER_PAGE_URL='/api/admin/users';

const RegisterPage = () => {
  // const [success, setSuccess] = useState(false);
  // const [errMessage, setErrMessage] = useState('');
  const isAdminPage = useMatch('/admin-register');

  const [firstName, setFirstName] = useState('');
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState('');
  const [lastNameValid, setLastNameValid] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [username, setUsername] = useState('');
  const [usernameValid, setUsernameValid] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [role, setRole] = useState(ROLE_USER);

  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);

  useEffect(() => {
    setFirstNameValid(NAMES_REGEX.test(firstName));
  }, [firstName])

  useEffect(() => {
    setLastNameValid(NAMES_REGEX.test(lastName));
  }, [lastName])

  useEffect(() => {
    setUsernameValid(USERNAME_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setEmailValid(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setPasswordValid(PASSWORD_REGEX.test(password));
  }, [password])

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registrationData = { firstName, lastName, username, email, birthDate: "1998-05-29", password };
      let response;
      if (isAdminPage) {
        response = await axiosClient.post(ADMIN_REGISTER_PAGE_URL, JSON.stringify(registrationData))
      } else {
        response = await axiosClient.post(REGISTER_PAGE_URL, JSON.stringify(registrationData))
      }
      if (response.status >=200 && response.status < 300) {
        handleSuccess();
      }
    } catch (err) {
      handleFail();
      console.log(err.message);
    }
  }

  const handleSuccess = () => {
    setOpenSuccess(true);
  };

  const handleFail = () => {
    setOpenFail(true);
  }


  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const handleCloseFail = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFail(false);
  };

  return (
      <div className="form-page-container">
        <div className="form-container registration-form-container">
          <form className="registration-form">
            <h4>Enter your details below:</h4><br/>
            <label className="" htmlFor="firstName">First Name
              {
                firstName && firstNameValid ?
                  <span> <FontAwesomeIcon icon={faCheck}/> </span>
                  :
                  <span> <FontAwesomeIcon icon={faTimes}/> </span>
              }
            </label><br/>
            <TextField id="firstName standard-basic" label="First Name" variant="standard" type="text" autoComplete="off" required
                   onFocus={() => setFirstNameFocus(true)}
                   onBlur={() => setFirstNameFocus(false)}
                   onChange={(e) => setFirstName(e.target.value)}
            />
            <p className={firstNameFocus && !firstNameValid ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faInfo} /> 1-50 characters. Contains only letters.
            </p>
            <label htmlFor="lastName">Last Name
              {
                lastName && lastNameValid ?
                  <span> <FontAwesomeIcon icon={faCheck}/> </span>
                  :
                  <span> <FontAwesomeIcon icon={faTimes}/> </span>
              }
            </label><br/>
            <TextField id="lastName standard-basic" label="Last Name" variant="standard" type="text" autoComplete="off" required
                   onFocus={() => setLastNameFocus(true)}
                   onBlur={() => setLastNameFocus(false)}
                   onChange={(e) => setLastName(e.target.value)}
            />
            <p className={lastNameFocus && !lastNameValid ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faInfo} /> 1-50 characters. Contains only letters.
            </p>
              <label htmlFor="username">Username
                {
                  username && usernameValid ?
                    <span> <FontAwesomeIcon icon={faCheck} /> </span>
                    :
                    <span> <FontAwesomeIcon icon={faTimes} /> </span>
                }
              </label><br/>
              <TextField id="username standard-basic" label="Username" variant="standard" type="text" autoComplete="off" required
                     onFocus={() => setUsernameFocus(true)}
                     onBlur={() => setUsernameFocus(false)}
                     onChange={(e) => setUsername(e.target.value)}
              />
              <p className={usernameFocus && !usernameValid ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faInfo} /> 3 - 16 characters. Can be letters/numbers.
              </p>
              <label htmlFor="email">E-mail
                {
                  email && emailValid ?
                    <span> <FontAwesomeIcon icon={faCheck} /> </span>
                    :
                    <span> <FontAwesomeIcon icon={faTimes} /> </span>
                }
              </label><br/>
              <TextField id="email standard-basic" label="E-mail" variant="standard" type="text" autoComplete="off" required
                     onFocus={() => setEmailFocus(true)}
                     onBlur={() => setEmailFocus(false)}
                     onChange={(e) => setEmail(e.target.value)}/>
              <p className={emailFocus && !emailValid ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faInfo} /> Email must have a valid format (ex. 'text@provider.com')
              </p>
              { isAdminPage ?
                <>
                  <label htmlFor="userRole">Role
                    {
                      role ?
                        <span> <FontAwesomeIcon icon={faCheck}/> </span>
                        :
                        <span> <FontAwesomeIcon icon={faTimes}/> </span>
                    }
                    </label><br/>
                    <Select id="userRole demo-simple-select" className="role-select" labelId="demo-simple-select-label" defaultValue={ROLE_USER}
                    onChange={(e) => setRole(e.target.value)}>
                    <MenuItem  value={ROLE_USER}>User</MenuItem >
                    <MenuItem  value={ROLE_ADMIN}>Admin</MenuItem >
                    <MenuItem  value={ROLE_INSPECTOR}>Inspector</MenuItem >
                    </Select><br/>
                </>
              : null}
              <label htmlFor="password">Password
                {
                  password && passwordValid ?
                    <span> <FontAwesomeIcon icon={faCheck} /> </span>
                    :
                    <span> <FontAwesomeIcon icon={faTimes} /> </span>
                }
              </label><br/>
              <TextField id="password standard-basic" label="Password" variant="standard" type="password" required
                     onFocus={() => setPasswordFocus(true)}
                     onBlur={() => setPasswordFocus(false)}
                     onChange={(e) => setPassword(e.target.value)}/>
              <p className={ passwordFocus && !passwordValid ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faInfo} /> Must contain at least eight characters, at least one number and both lower and uppercase letters and special characters
              </p>
              <label htmlFor="confirm-password">Confirm password
                {
                  confirmPassword && passwordsMatch ?
                    <span> <FontAwesomeIcon icon={faCheck} /> </span>
                    :
                    <span> <FontAwesomeIcon icon={faTimes} /> </span>
                }
              </label><br/>
              <TextField id="confirm-password standard-basic" label="Confirm password" variant="standard" type="password" required
                     onFocus={() => setConfirmPasswordFocus(true)}
                     onBlur={() => setConfirmPasswordFocus(false)}
                     onChange={(e) => setConfirmPassword(e.target.value)}/>
              <p className={confirmPasswordFocus && !passwordsMatch ? "valid" : "hide"}>
                Passwords do not match
              </p>
              <Button variant="contained" onClick={handleSubmit} style={{marginBottom: "250px"}}
                      disabled={!firstNameValid || !lastNameValid || !usernameValid || !emailValid || !passwordValid || !passwordsMatch}>
                Sign up
              </Button>
            </form>
          </div>
        <div className="image-container">
          <img src={registerPageImage} alt="Registration" />
        </div>
        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
          <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
            Successfully created account
          </Alert>
        </Snackbar>
        <Snackbar open={openFail} autoHideDuration={6000} onClose={handleCloseFail}>
          <Alert onClose={handleCloseFail} severity="error" sx={{ width: '100%' }}>
            Failed to create account, try again
          </Alert>
        </Snackbar>
      </div>
  )
}

export default RegisterPage;