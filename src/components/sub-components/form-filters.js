import React, { useState,useContext } from 'react';
import FilterControl from './filter-control';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import './styles/accordion-styles.css';
import {filterFields} from '../../config';
import Grid from '@material-ui/core/Grid';
import {ByhReqContext} from '../../contexts/byh-req-context';

function FormFilters(props){
    const [currentFilters,setFilters] = useState({});
    const {updateCurrentForms} = useContext(ByhReqContext); 

    const buildFilters = (forms) => {
        let filterTarget = "value";
        let filters = [];
        let filterIds = Object.keys(filterFields);
        let formData = {};
        filterIds.forEach(id => {
            formData[id] = {
                title:'',
                data:[]
            };
            if(!currentFilters[id]){
                currentFilters[id] = {
                    value:null
                };
            }
        });

        forms.forEach(form => {
            form.fields.forEach(field => {
                if(formData[field.id] && !formData[field.id].title){
                    formData[field.id].title = field.title;  
                } 
                if(formData[field.id] && field.value){
                    formData[field.id].data.push(field);
                }
            });
        });
        console.log(formData);
        for(let fieldId in formData){
            let {data,title} = formData[fieldId];
            let filterTitle = title.length > 30 ? title.slice(0,30) + '...' : title;
            
            let filter = (
                <Grid item key={fieldId} xs={12} md={4}>
                    <FilterControl responses={data} title={filterTitle} target={filterTarget} changeData={fieldId} filterChanged={filterChanged}/>
                </Grid>
            );

            filters.push(filter);
        }

        return filters;
    }

    const filterChanged = (newVal,changeType,changeData) => {
        console.log(newVal,changeType,changeData);
        try{
            if(newVal){
                let newForms = props.currentForms.filter(form => {
                    return form.fields.find(field => field.value === newVal.value);
                });
                updateCurrentForms(newForms);
                if(props.formsUpdated){
                    props.formsUpdated(newForms);
                }
            }
            else{

            }
        }
        catch(e){
            console.warn('error updating filtered forms',e);
        }
        
    } 

    const formControls = props.currentForms ? buildFilters(props.currentForms) : null

    return(
        <div className="filter-container">
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className="accordion-header">Form Filters</Typography>
                    <Typography className="accordion-description">Use these options to filter your list of forms. The fields will be automatically populated once a search is run</Typography>
                </AccordionSummary>
                <Grid alignItems="center" container justify="center">
                    {formControls}
                </Grid>
            </Accordion>
        </div>
    );
}

export default FormFilters;