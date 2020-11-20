import React, {useContext} from 'react';
import {AuthContext} from '../contexts/auth-context';
import {Redirect} from 'react-router-dom';
import {urlFactory} from '../helpers/url-factory';

export default () => Component => {
    function RequiresLogin(props){
        const {isLoggedIn,authError} = useContext(AuthContext); 
        const {...passThroughProps} = props;
        if(!isLoggedIn || authError){
            let url = urlFactory.buildLink();
            return <Redirect to={url} />;
        }

        return <Component {...passThroughProps} />;
    }

    return RequiresLogin;
};