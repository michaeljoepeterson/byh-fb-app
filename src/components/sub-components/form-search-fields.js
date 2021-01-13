import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {ByhReqContext} from '../../contexts/byh-req-context';

function FormSearchFields(props){
    const [formFields,setFormFields] = useState({
        searchTerms:null,
        fromDate:null,
        toDate:null
    });

    const {getForms} = useContext(ByhReqContext); 

    const fieldSpacing = 5;

    const searchForms = async (event) => {
        event.persist();
        event.preventDefault();
        try{
            let response = await getForms(formFields);
            //console.log(response);
            //push response to parent
            if(props.formsUpdated){
                props.formsUpdated(response.documents);
            }
        }
        catch(e){
            console.warn("error getting forms: ",e);
        }
    }

    const updateFields = (event,field) => {
        event.persist();
        let currentState = {...formFields};
        currentState[field] = event.target.value;
        setFormFields(currentState);
    }

    return(
        <div>
            <h2>Search Forms</h2>
            <form onSubmit={(e) => searchForms(e)}>
                <Grid alignItems="center" container justify="center" spacing={fieldSpacing}>
                    <Grid item xs={12} md={3}>
                        <TextField id="search-fields" label="Search Terms" type="text"/>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            id="fromDate"
                            label="From: "
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange = {(e) => updateFields(e,"fromDate")}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            id="toDate"
                            label="Until: "
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange = {(e) => updateFields(e,"toDate")}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default FormSearchFields;