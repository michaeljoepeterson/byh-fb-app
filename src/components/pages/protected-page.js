import React, { useState, useContext } from 'react';
import RequiresLogin from '../../HOC/requires-login';
import {ByhReqContext} from '../../contexts/byh-req-context';
import Button from '@material-ui/core/Button';

function ProtectedPage(props){
    const [formData,setFormData] = useState(null);
    const {getForms} = useContext(ByhReqContext); 
    const placeholderStyles = {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }

    const getFormData = async () =>{
        try{
            let response = await getForms();
            //debugger;
            setFormData(response.message);
        }
        catch(e){
            setFormData(null);
        }
    }

    const formElement = formData ? (<p>{formData}</p>) : null;

    return(
        <div style={placeholderStyles}>
            <p>protected page</p>
            <div>
                <Button variant="contained" color="primary" onClick={(e) => getFormData()}>Get Protected Forms</Button>
            </div>
            {formElement}
        </div>
    )
}

export default RequiresLogin()(ProtectedPage);
