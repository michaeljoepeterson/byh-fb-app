import React, { useState, createContext, useContext } from 'react';
import {API_BASE_URL} from '../config';
import {FirebaseContext} from '../contexts/firebase-context';
import {urlFactory} from '../helpers/url-factory';
const axios = require('axios');

export const ByhReqContext = createContext();

export function ByhReqContextProvider(props){
    const [masterForms,setMasterForms] = useState(null);
    const [currentForms,setForms] = useState(null);
    const baseUrl = API_BASE_URL;
    const fb = useContext(FirebaseContext); 
    const dateField = "Contact Date";
    const defualtConfig = {
        headers:{
            authtoken:null,
            project:null
        }
    };

    const [reqState,setReqState] = useState({
        isLoading:false
    });

    const buildFormQuery = (options) => {
        let query = `?dateField=${dateField}`;
        for(let key in options){
            if(options[key]){
                query += `&${key}=${options[key]}`;
            }
        }
        return query;
    }

    const getForms = async(queryOptions) => {
        try{
            const query = queryOptions ? buildFormQuery(queryOptions) : '';
            let authtoken = await fb.getToken();
            let config = {...defualtConfig};
            config.headers.authtoken = authtoken;
            config.headers.project = urlFactory.getProject();
            let url = `${baseUrl}/forms${query}`;
            const response = await axios.get(url,config);
            //console.log(response);
            setMasterForms(response.data.documents);
            setForms(response.data.documents);
            return response.data;
        }
        catch(e){
            console.log('error getting forms: ',e);
            throw e;
        }
    }

    const updateCurrentForms = (newForms) => {
       setForms(newForms); 
    }

    return (
        <ByhReqContext.Provider value={{
            isLoading:reqState.isLoading,
            getForms,
            currentForms,
            updateCurrentForms,
            masterForms
        }}>
            {props.children}
        </ByhReqContext.Provider>
    )
}