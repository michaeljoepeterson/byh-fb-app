import React from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './components/pages/landing-page';
import ProtectedPage from './components/pages/protected-page';
import CreateUserForm from './components/sub-components/create-user';
import {AuthContextProvider} from './contexts/auth-context';
import {FirebaseContextProvider} from './contexts/firebase-context';
import './App.css';

function App() {
  return (
    <FirebaseContextProvider>
      <AuthContextProvider> 
        <Route exact path="/"  render={(props) => (
          <LandingPage key={props.match.params.pageid} {...props}/>)
        }/>
        <Route exact path="/protected" render={(props) => (
          <ProtectedPage key={props.match.params.pageid} {...props} />)
        } />
        <Route exact path="/create-admin" render={(props) => (
          <LandingPage key={props.match.params.pageid} {...props} />)
        } />
      </AuthContextProvider>
    </FirebaseContextProvider>
  );
}

export default App;
