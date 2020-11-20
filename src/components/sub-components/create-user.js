import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {AuthContext} from '../../contexts/auth-context';
import {urlFactory} from '../../helpers/url-factory';
import './styles/login-form.css';

export default function CreateUserForm(props){

    const [email,setEmail] = useState(null);
    const [pass,setPass] = useState(null);
    const [firstName,setFirstName] = useState(null);
    const [lastName,setLastName] = useState(null);
    const [confirmPass,setConfirmPass] = useState(null);
    const [custError,setCustError] = useState(null);
    const {authLoading,authError,createUser,googleSignIn} = useContext(AuthContext); 
    //const {authLoading,authError} = authState;
    const emailType = 'email';
    const passType = 'pass';
    const confirmPassType = 'confirmPass';
    const firstNameType = 'firstName';
    const lastNameType = 'lastName';
    const tryCreate = async (event) => {
        event.persist();
        event.preventDefault();
        setCustError(null);

        if(pass !== confirmPass){
            setCustError('passwords do not match');
            return ;
        }
        if(email && pass && firstName && lastName){
            try{
                let user = {
                    email,
                    password:pass,
                    firstName,
                    lastName
                }
                await createUser(user);
            }
            catch(e){

            }
        }
    }

    const inputChanged = (event,type) => {
        event.persist();
        const val = event.target.value;
        if(type === emailType){
            setEmail(val);
        }
        else if(type === passType){
            setPass(val);
        }
        else if(type === confirmPassType){
            setConfirmPass(val);
        }
        else if(type === firstNameType){
            setFirstName(val);
        }
        else if(type === lastNameType){
            setLastName(val);
        }
    }
    let displayLoading = authLoading;
    let homeUrl = urlFactory.buildLink();
    //console.log('loading: ',displayLoading);
    //console.log('render form',authError,displayLoading);
    return(
        <div className="login-container center-container">
            <form className="login-form" onSubmit={(e) => tryCreate(e)}>
                <Typography variant='h4' className="form-title">{props.title}</Typography>
                <div className="input-container">
                    <TextField required id="user" label="Email" variant="outlined" helperText={authError || custError ? 'Error Creating Account' : ''} onChange={(e) => inputChanged(e,emailType)}/>
                </div>
                <Grid container justify="center">
                    <Grid item xs={12} className="input-container">
                        <TextField required id="firstName" label="First Name" variant="outlined" type="text" helperText={authError || custError? 'Error Creating Account' : ''} onChange={(e) => inputChanged(e,firstNameType)}/>
                    </Grid>
                    <Grid item xs={12} className="input-container">
                        <TextField required id="lastName" label="Last Name" variant="outlined" type="text" helperText={authError || custError? 'Error Creating Account' : ''} onChange={(e) => inputChanged(e,lastNameType)}/>
                    </Grid>
                </Grid>
                <Grid container justify="center">
                    <Grid item xs={12} className="input-container">
                        <TextField required id="password" label="Password" variant="outlined" type="password" helperText={authError || custError? 'Error Creating Account' : ''} onChange={(e) => inputChanged(e,passType)}/>
                    </Grid>
                    <Grid item xs={12} className="input-container">
                        <TextField required id="password" label="Confirm Password" variant="outlined" type="password" helperText={authError || custError? 'Error Creating Account' : ''} onChange={(e) => inputChanged(e,confirmPassType)}/>
                    </Grid>
                </Grid>
                <div className="button-container">
                    <CircularProgress className={displayLoading ? '' : 'hidden'} />
                    <Link className="button-link" to={homeUrl}>
                        <Button className={displayLoading ? 'hidden' : ''} variant="contained" color="primary">
                        Login
                        </Button>
                    </Link>
                    <Button className={displayLoading ? 'hidden' : ''} variant="contained" color="primary" type="submit">Create</Button>
                </div>
                <div className="google-sign-in">
                    <Button className={displayLoading ? 'hidden' : ''} variant="contained" color="primary" onClick={(e) => googleSignIn()}>Sign In With Google</Button>
                </div>
            </form>
        </div>
    )
    
}