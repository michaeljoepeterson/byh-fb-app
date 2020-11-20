import React, {  createContext } from 'react';
import Firebase from '../fb/firebase';

export const FirebaseContext = createContext();
//setup to ensure only a single instance of firebase available to app
export function FirebaseContextProvider(props){
    return(
        <FirebaseContext.Provider value={new Firebase()}>
            {props.children}
        </FirebaseContext.Provider>
    );
}