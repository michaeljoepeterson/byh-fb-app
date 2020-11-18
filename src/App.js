import React, {useState} from 'react';
import {Route ,useHistory,Switch } from 'react-router-dom';
import LandingPage from './components/pages/landing-page';
import ProtectedPage from './components/pages/protected-page';
import AccessPage from './components/pages/access-page';
import {AuthContextProvider} from './contexts/auth-context';
import {FirebaseContextProvider} from './contexts/firebase-context';
import {ByhReqContextProvider} from './contexts/byh-req-context';
import {urlFactory} from './helpers/url-factory';
import './App.css';

function App() {
  const [project,setProject] = useState(urlFactory.project);
  const [isChecked,setIsChecked] = useState(false);
  const history = useHistory();
  if(!project){
    history.push(`byh/`);
    urlFactory.setAppProject();
    setProject(urlFactory.project);
  }
  else{
    if(!urlFactory.checkHasProject()){
      history.push(`${project}/`);
    }
    else{
      if(!isChecked){
        setProject(urlFactory.project);
        setIsChecked(true);
      }
    }
  }
  
  let landingPageUrl = `/${project}/`;
  let protectedPageUrl = `/${project}/protected`;
  let createAdminUrl = `/${project}/create-admin`;
  let accessPageUrl = `/${project}/access`;

  return (
    <FirebaseContextProvider>
      <AuthContextProvider>
        <ByhReqContextProvider>
          <Switch>
            <Route exact path={landingPageUrl}  render={(props) => (
              <LandingPage key={props.match.params.pageid} {...props}/>)
            }/>
            <Route exact path={protectedPageUrl} render={(props) => (
              <ProtectedPage key={props.match.params.pageid} {...props} />)
            } />
            <Route exact path={createAdminUrl} render={(props) => (
              <LandingPage key={props.match.params.pageid} {...props} />)
            } />
            <Route exact path={accessPageUrl} render={(props) => (
              <AccessPage key={props.match.params.pageid} {...props} />)
            } />
            <Route render={(props) => (
              <LandingPage key={props.match.params.pageid} {...props}/>)} 
              />
          </Switch>
        </ByhReqContextProvider>
      </AuthContextProvider>
    </FirebaseContextProvider>
  );
}

export default App;
