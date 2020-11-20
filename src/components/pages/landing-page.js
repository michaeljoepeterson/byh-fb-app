import React, {useContext} from 'react';
import LoginForm from '../sub-components/login-form';
import { Redirect } from 'react-router';
import { withRouter} from 'react-router-dom';
import {AuthContext} from '../../contexts/auth-context';
import CreateUserForm from '../sub-components/create-user';
import {urlFactory} from '../../helpers/url-factory';
import './styles/landing-page.css';

export function LandingPage(props){
    const title = 'BYH App';
    const {isLoggedIn} = useContext(AuthContext); 
    console.log(props.location.pathname);
    const isCreate = props.location.pathname.includes('create-admin');
    if(isLoggedIn){
        let url = urlFactory.buildLink('protected');
        return <Redirect to={url}/>;
    }

    //console.log('is logged in context: ',isLoggedIn);
    const form = isCreate ? <CreateUserForm title={title}/> : <LoginForm title={title}/>;
    return(
        <div className="center-container">
            {form}
        </div>
    )
}

export default withRouter(LandingPage);