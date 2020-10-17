import React from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './components/pages/landing-page';
import ProtectedPage from './components/pages/protected-page';
import {AuthContextProvider} from './contexts/auth-context';
import './App.css';

function App() {
  return (
    <AuthContextProvider> 
      <Route exact path="/"  render={(props) => (
        <LandingPage />)
      }/>
      <Route exact path="/protected" render={(props) => (
          <ProtectedPage key={props.match.params.pageid} {...props} />)
        } />
    </AuthContextProvider>
  );
}

export default App;
