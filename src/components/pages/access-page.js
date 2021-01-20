import React from 'react';
import RequiresLogin from '../../HOC/requires-login';
import Paper from '@material-ui/core/Paper';
import './styles/access-page.css';

function AccessPage(props){

    return(
        <div className="access-container">
            <Paper elevation={3} >
                <div>
                    <p>Looks like you don't have access to view this page, please contact your admin for access</p>
                </div>
            </Paper>
        </div>
    )
}

export default RequiresLogin()(AccessPage);