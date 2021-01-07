import app from 'firebase/app';
import {fbConfig} from '../firebase-config';
import 'firebase/auth';
import firebase from 'firebase';
import authService from '../services/auth-service';

class Firebase {
  //can optionally use returned user to get auth token
  constructor() {
    //if(!firebase.apps.length){
    app.initializeApp(fbConfig);
    //}

    this.auth = app.auth();
    this.provider = new firebase.auth.GoogleAuthProvider();
    this.currentUser = null;
    //potentially use rxjs observables to handle this?
    //service change to set auth change context?
    firebase.auth().onAuthStateChanged(async (user) => {
      if(user){
        this.currentUser = user;
        let token = await this.getToken();
        authService.currentFbToken.next(token);
      }
      else{
        this.currentUser = null;
      }
    });
  }

  signInWithGoogle = async () =>{
    try{
      const result = await this.auth.signInWithPopup(this.provider);
      if(!result){
        throw {message:'no account selected'};
      }
      //result.user.
      return result.user;
    }
    catch(e){
        console.log('error logging in with google: ',e);
        throw e;
    }
  }

  createUserEmail = async (email,pass) => {
    try{
        const result = await this.auth.createUserWithEmailAndPassword(email,pass);
        return result.user;
    }
    catch(e){
        console.log('error logging in: ',e);
        throw e;
    }
  }

  signInEmail = async (email,pass) => {
      try{
          const result = await this.auth.signInWithEmailAndPassword(email,pass);
          return result.user;
      }
      catch(e){
        console.log('error signing in: ',e);
        throw e;
      }
  }

  logout = async () => {
      try{
          this.auth.signOut();
      }
      catch(e){
        console.log('error loggint out: ',e);
        throw e;
      }
  }

  getToken = async () => {
      try{
        let token = this.currentUser ? await this.currentUser.getIdToken() : await this.auth.currentUser.getIdToken(true);
        return token;
      } 
      catch(e){
          console.log('error getting token:', e);
          throw e;
      }
  }
}
 
export default Firebase;