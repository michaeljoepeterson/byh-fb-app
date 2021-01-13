import React, { useState, useContext } from 'react';
import RequiresLogin from '../../HOC/requires-login';
import CheckUserLevel from '../../HOC/check-user-level';
import {ByhReqContext} from '../../contexts/byh-req-context';
import Button from '@material-ui/core/Button';
import FormTable from '../sub-components/form-table';
import FormSearchControls from '../sub-components/form-search-controls';
import './styles/form-controls.css';

function ProtectedPage(props){
    const [formData,setFormData] = useState(null);
    const {getForms,currentForms} = useContext(ByhReqContext); 
    const placeholderStyles = {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    };

    const updateForms = (forms) => {
        console.log("updated forms: ",forms)
    }
    //can optionally grab current forms from req context or pass a update function to 
    //have more control over updating forms
    console.log(currentForms);
    const formTable = formData ? (<FormTable forms={[formData.document]}/>) : null;
    return(
        <div style={placeholderStyles}>
            <p>protected page</p>
            <div className="form-controls">
                <FormSearchControls />
            </div>
            <div>
                {formTable}
            </div>
        </div>
    )
}

export default RequiresLogin()(CheckUserLevel(1)(ProtectedPage));
