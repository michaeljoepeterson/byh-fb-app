import React, { useState, createContext, useContext } from 'react';
import {API_BASE_URL} from '../config';
import {FirebaseContext} from '../contexts/firebase-context';
const axios = require('axios');

export const ByhReqContext = createContext();

export function ByhReqContextProvider(props){
    const baseUrl = API_BASE_URL;
    const fb = useContext(FirebaseContext); 
    const defualtConfig = {
        headers:{
            authtoken:null
        }
    };

    const [reqState,setReqState] = useState({
        isLoading:false
    });

    const getForms = async () => {
        try{
            let authtoken = await fb.getToken();
            let config = {...defualtConfig};
            config.headers.authtoken = authtoken;
            let url = `${baseUrl}/forms`;
            const response = await axios.get(url,config);
            console.log(response);
            return response.data;
        }
        catch(e){
            console.log('error getting forms: ',e);
            throw e;
        }
    }

    return (
        <ByhReqContext.Provider value={{
            isLoading:reqState.isLoading,
            getForms
        }}>
            {props.children}
        </ByhReqContext.Provider>
    )
}