import React, { useState, createContext, useContext } from 'react';
import {API_BASE_URL} from '../config';
import {FirebaseContext} from '../contexts/firebase-context';
import {urlFactory} from '../helpers/url-factory';
const axios = require('axios');

export const ByhReqContext = createContext();

export function ByhReqContextProvider(props){
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
        if(options.fromDate){
            query += `&fromDate=${options.fromDate}`;
        }
        if(options.toDate){
            query += `&toDate=${options.toDate}`;
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
            setForms(response.data.documents);
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
            getForms,
            currentForms
        }}>
            {props.children}
        </ByhReqContext.Provider>
    )
}