import React, {useContext} from 'react';
import {AuthContext} from '../contexts/auth-context';
import {Redirect} from 'react-router-dom';
import {urlFactory} from '../helpers/url-factory';
import {withRouter} from 'react-router-dom';
import {pageConfig} from '../config';

//optionally pass in a page level
export default (requiredLevel) => (Component) => {
    function CheckUserLevel(props){
        const {currentUser} = useContext(AuthContext); 
        const {location,...passThroughProps} = props;
        let pageRoute = urlFactory.getPageRoute(location.pathname);
        let foundPage = pageConfig.find(page => page.name.includes(pageRoute));
        console.log(currentUser);
        //debugger;
        try{
            if(foundPage && currentUser.level.rank <= foundPage.level){
                return <Component {...passThroughProps} />;
            }
            else if(currentUser.level.rank <= requiredLevel){
                return <Component {...passThroughProps} />;
            }
            let url = urlFactory.buildLink('access');
            return <Redirect to={url} />;
        }
        catch(e){
            let url = urlFactory.buildLink('access');
            return <Redirect to={url} />;
        }
    }

    return withRouter(CheckUserLevel);
};