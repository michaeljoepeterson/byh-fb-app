import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {AuthContext} from '../../contexts/auth-context';
import './styles/login-form.css';

export default function CreateUserForm(props){

    const [email,setEmail] = useState(null);
    const [pass,setPass] = useState(null);
    const [confirmPass,setConfirmPass] = useState(null);
    const {authLoading,authError,login} = useContext(AuthContext); 
    //const {authLoading,authError} = authState;
    const emailType = 'email';
    const passType = 'pass';
    const confirmPassType = 'confirmPass';
    const tryCreate = async (event) => {
        event.persist();
        event.preventDefault();
        if(pass !== confirmPass){
            return 
        }
        if(email && pass){
            console.log('login');
            try{
                await login(email,pass);
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
    }
    let displayLoading = authLoading;
    //console.log('loading: ',displayLoading);
    //console.log('render form',authError,displayLoading);
    return(
        <div className="login-container center-container">
            <form className="login-form" onSubmit={(e) => tryCreate(e)}>
                <Typography variant='h4' className="form-title">{props.title}</Typography>
                <div className="input-container">
                    <TextField required id="user" label="Email" variant="outlined" helperText={authError ? 'Error Creating Account' : ''} onChange={(e) => inputChanged(e,emailType)}/>
                </div>
                <div className="input-container">
                    <TextField required id="password" label="Password" variant="outlined" type="password" helperText={authError ? 'Error Creating Account' : ''} onChange={(e) => inputChanged(e,passType)}/>
                </div>
                <div className="input-container">
                    <TextField required id="password" label="Confirm Password" variant="outlined" type="password" helperText={authError ? 'Error Creating Account' : ''} onChange={(e) => inputChanged(e,confirmPassType)}/>
                </div>
                <div className="input-container">
                    <CircularProgress className={displayLoading ? '' : 'hidden'} />
                    <Link className="button-link" to="/">
                        <Button className={displayLoading ? 'hidden' : ''} variant="contained" color="primary">
                        Login
                        </Button>
                    </Link>
                    <Button className={displayLoading ? 'hidden' : ''} variant="contained" color="primary" type="submit">Create</Button>
                </div>
            </form>
        </div>
    )
    
}