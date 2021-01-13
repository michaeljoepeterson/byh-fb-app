import React, { useState, useContext } from 'react';
import FormSearchFields from './form-search-fields';

function FormSearchControls(props){

    const formsUpdated = (forms) => {
        if(props.formsUpdated){
            props.formsUpdated(forms);
        }
    }

    return(
        <div>
            <FormSearchFields formsUpdated={formsUpdated} title={props.searchTitle}/>
        </div>
    );
}

export default FormSearchControls;