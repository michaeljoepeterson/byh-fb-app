import React, { useState, createContext } from 'react';
import {API_BASE_URL} from '../config';
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
    console.log('context: ',authState);
    return (
        <AuthContext.Provider value={{
            isLoggedIn:authState.isLoggedIn,
            authError:authState.authError,
            authKey:authState.authKey,
            authLoading:authState.authLoading,
            authState
            ,login}}>
            {props.children}
        </AuthContext.Provider>
    );
}