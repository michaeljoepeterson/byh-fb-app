import React, { useState, useContext } from 'react';
import FormSearchFields from './form-search-fields';
import Grid from '@material-ui/core/Grid';
import FormFilters from './form-filters';

function FormSearchControls(props){

    const formsUpdated = (forms) => {
        if(props.formsUpdated){
            props.formsUpdated(forms);
        }
        if(props.filtersUpdated){
            props.filtersUpdated(forms);
        }
    }

    return(
        <Grid alignItems="center" container justify="center">
            <Grid item xs={12}>
                <FormSearchFields formsUpdated={formsUpdated} title={props.searchTitle}/>
            </Grid>
            <Grid item xs={12}>
                <FormFilters formsUpdated={formsUpdated}  currentForms={props.currentForms}/>
            </Grid>
        </Grid>
    );
}

export default FormSearchControls;