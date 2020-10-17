import React from 'react';
import RequiresLogin from '../../HOC/requires-login';

function ProtectedPage(props){
    
    return(
        <div className="center-container">
            <p>protected page</p>
        </div>
    )
}

export default RequiresLogin()(ProtectedPage);
