import React, { useState, createContext, useContext } from 'react';
import {API_BASE_URL} from '../config';
import {FirebaseContext} from '../contexts/firebase-context';
const axios = require('axios');
//to do local storage implementation
export const AuthContext = createContext();

export function AuthContextProvider(props){
    //state
    const [authState,setAuthState] = useState({
        authKey:null,
        isLoggedIn:false,
        authLoading:false,
        authError:null
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

    const login = async (email,password) => {
        try{
            setLoading(true);
            const url = `${API_BASE_URL}/auth/login`;
            const body = {
                email,
                password
            };
            const authRes = await axios.post(url,body);
            const {authToken} = authRes.data;
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

    const createUser = async (email,password) => {
        try{
            setLoading(true);
            const user = await fb.createUserEmail(email,password);
            const authToken = await fb.getToken();
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

    return (
        <AuthContext.Provider value={{
            isLoggedIn:authState.isLoggedIn,
            authError:authState.authError,
            authKey:authState.authKey,
            authLoading:authState.authLoading,
            login,
            createUser
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}