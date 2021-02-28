import React, { useState, useContext } from 'react';
import RequiresLogin from '../../HOC/requires-login';
import CheckUserLevel from '../../HOC/check-user-level';
import {ByhReqContext} from '../../contexts/byh-req-context';
import FormTable from '../sub-components/form-table';
import FormSearchControls from '../sub-components/form-search-controls';
import './styles/form-controls.css';

function ProtectedPage(props){
    //const [formData,setFormData] = useState(null);
    const {masterForms,currentForms} = useContext(ByhReqContext);

    const placeholderStyles = {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    };
    /*
    const updateForms = (forms) => {
        console.log("updated forms: ",forms)
    }
    */
    
    //can optionally grab current forms from req context or pass a update function to 
    //have more control over updating forms
    console.log('master forms: ',masterForms);
    console.log('current forms: ',currentForms);

    const formTable = currentForms ? (<FormTable forms={currentForms}/>) : null;
    return(
        <div className="search-container" style={placeholderStyles}>
            <div className="form-controls">
                <FormSearchControls searchTitle="Search Intake Forms" currentForms={masterForms}/>
            </div>
            <div>
                {formTable}
            </div>
        </div>
    )
}

export default RequiresLogin()(CheckUserLevel(1)(ProtectedPage));
