import React, {useContext} from 'react';
import {AuthContext} from '../contexts/auth-context';
import {Redirect} from 'react-router-dom';

export default () => Component => {
    function RequiresLogin(props){
        const {authState} = useContext(AuthContext); 
        const {isLoggedIn,authError} = authState; 
        const {...passThroughProps} = props;
        if(!isLoggedIn || authError){
            return <Redirect to='/' />;
        }

        return <Component {...passThroughProps} />;
    }

    return RequiresLogin;
};