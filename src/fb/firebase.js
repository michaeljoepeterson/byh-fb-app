import app from 'firebase/app';
import {fbConfig} from '../firebase-config';
import 'firebase/auth';
//import * as firebase from 'firebase';
 
class Firebase {
  constructor() {
    //if(!firebase.apps.length){
        app.initializeApp(fbConfig);
    //}

    this.auth = app.auth();
  }

  createUserEmail = async (email,pass) => {
    try{
        return this.auth.createUserWithEmailAndPassword(email,pass);
    }
    catch(e){
        console.log('error logging in: ',e);
    }
  }

  signInEmail = async (email,pass) => {
      try{
          return this.auth.signInWithEmailAndPassword(email,pass);
      }
      catch(e){
        console.log('error signing in: ',e);
      }
  }

  logout = async () => {
      try{
          this.auth.signOut();
      }
      catch(e){
        console.log('error loggint out: ',e);
      }
  }

  getToken = async () => {
      try{
        let token = await this.auth.currentUser.getIdToken(true);
        return token;
      } 
      catch(e){
          console.log('error getting token:', e);
      }
  }
}
 
export default Firebase;