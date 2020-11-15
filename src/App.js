import React, {useState} from 'react';
import {Route ,useHistory } from 'react-router-dom';
import LandingPage from './components/pages/landing-page';
import ProtectedPage from './components/pages/protected-page';
import {AuthContextProvider} from './contexts/auth-context';
import {FirebaseContextProvider} from './contexts/firebase-context';
import {ByhReqContextProvider} from './contexts/byh-req-context';
import {urlFactory} from './helpers/url-factory';
import './App.css';

function App() {
  console.log(urlFactory.project);
  const [project,setProject] = useState(urlFactory.project);
  const [isChecked,setIsChecked] = useState(false);
  const history = useHistory();
  if(!project){
    history.push(`byh/`);
    urlFactory.getProject();
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
  let protectedPageUrl = `/${project}/protected`

  return (
    <FirebaseContextProvider>
      <AuthContextProvider>
        <ByhReqContextProvider>
          <Route exact path={landingPageUrl}  render={(props) => (
            <LandingPage key={props.match.params.pageid} {...props}/>)
          }/>
          <Route exact path={protectedPageUrl} render={(props) => (
            <ProtectedPage key={props.match.params.pageid} {...props} />)
          } />
          <Route exact path="/create-admin" render={(props) => (
            <LandingPage key={props.match.params.pageid} {...props} />)
          } />
          <Route render={(props) => (
            <LandingPage key={props.match.params.pageid} {...props}/>)} 
            />
        </ByhReqContextProvider>
      </AuthContextProvider>
    </FirebaseContextProvider>
  );
}

export default App;
