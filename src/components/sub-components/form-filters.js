import React, { useState, useContext } from 'react';
import FilterControl from './filter-control';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import './styles/accordion-styles.css';


function FormFilters(props){

    const buildFilters = () => {
        
    }

    return(
        <div className="filter-container">
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className="accordion-header">Form Filters</Typography>
                    <Typography className="accordion-description">Use these options to filter your list of forms. The fields will be automatically populated once a search is run</Typography>
                </AccordionSummary>

            </Accordion>
        </div>
    );
}

export default FormFilters;