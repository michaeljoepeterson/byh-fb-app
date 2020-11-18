import React, { useState, createContext, useContext } from 'react';
//import {API_BASE_URL} from '../config';
import {FirebaseContext} from '../contexts/firebase-context';
import {API_BASE_URL} from '../config';
import {urlFactory} from '../helpers/url-factory';
const axios = require('axios');
//to do local storage implementation
export const AuthContext = createContext();

export function AuthContextProvider(props){
    //state
    const baseUrl = API_BASE_URL;
    const [authState,setAuthState] = useState({
        authKey:null,
        isLoggedIn:false,
        authLoading:false,
        authError:null,
        currentUser:null
    });

    const updateState = newState => setAuthState(Object.assign({}, authState, newState));

    const fb = useContext(FirebaseContext); 

    const resetAuth = (err) => {
        let newState = {...authState};
        newState.authKey = null;
        newState.isLoggedIn = false;
        newState.authLoading = false;
        newState.authError = err ? err : null;
        
        updateState(newState);
    }

    const setLoading = (loading) => {
        let newState = {...authState};
        newState.authLoading = loading;
        updateState(newState);
    }

    const setAuth = (authToken) =>{
        let newState = {...authState};
        newState.isLoggedIn = true;
        newState.authKey = authToken;
        newState.authError = null;
        newState.authLoading = false;
        updateState(newState);
    }

    const updateUser = (user) => {
        let newState = {...authState};
        newState.currentUser = user;
        updateState(newState);
    }

    const login = async (email,password) => {
        try{
            setLoading(true);
            const userData = await fb.signInEmail(email,password);
            const authToken = await fb.getToken();
            let user ={
                email
            };
            const createRes = await createAppUser(user,authToken);
            if(authToken){
                setAuth(authToken);
            }
            else{
                resetAuth();
            }
        }
        catch(e){
            console.log('error loging in: ',e);
            resetAuth(e);
            throw(e);
        }
    }

    const createUser = async (user) => {
        try{
            setLoading(true);

            const userData = await fb.createUserEmail(user.email,user.password);
            const authToken = await fb.getToken();
            const createRes = await createAppUser(user,authToken);
            if(authToken){
                setAuth(authToken);
            }
            else{
                resetAuth();
            }
        }
        catch(e){
            console.log('error creating user',e);
            resetAuth(e);
            throw(e);
        }
    }

    const googleSignIn = async () => {
        try {
            const userData = await fb.signInWithGoogle();
            let splitName = userData.displayName.split(' ');

            let user = {
                email:userData.email,
                firstName:splitName[0],
                lastName:splitName[1]
            };
            const authToken = await fb.getToken();
            const createRes = await createAppUser(user,authToken);
            if(authToken){
                setAuth(authToken);
            }
            else{
                resetAuth();
            }
        }
        catch(e){
            console.log('error creating user',e);
            resetAuth(e);
        }
    }

    const createAppUser = async (user,authtoken) => {
        let project = urlFactory.getProject().toUpperCase();
        let headers = {
            headers:{
                project,
                authtoken
            }
        };
        user.project = [project];
        delete user.password;
        let url = `${baseUrl}/users`;
        try{
            const response = await axios.post(url,{user:user},headers);
            await getUserDetails(authtoken);
            return response;
        }
        catch(e){
            console.warn('Error saving new user: ',e);
            throw e;
        }
    }

    const getUserDetails = async (authtoken) =>{
        let project = urlFactory.getProject().toUpperCase();
        let headers = {
            headers:{
                project,
                authtoken
            }
        };

        let url = `${baseUrl}/users/check`;
        try{
            const response = await axios.get(url,headers);
            updateUser(response.user);
            return response.user;
        }
        catch(e){
            console.warn('Error saving new user: ',e);
            throw e;
        }
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn:authState.isLoggedIn,
            authError:authState.authError,
            authKey:authState.authKey,
            authLoading:authState.authLoading,
            login,
            createUser,
            googleSignIn
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}