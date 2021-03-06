import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';

import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';


@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})
export class GoogleLoginComponent {

  user: Observable<firebase.User>;
  error;
  constructor(private afAuth: AngularFireAuth, 
    private gplus: GooglePlus,
    private platform: Platform) {
    
      this.user = this.afAuth.authState;

  }

  async nativeGoogleLogin(): Promise<firebase.User> {
    try {
  
      const gplusUser = await this.gplus.login({
        'webClientId': 'AIzaSyBFukXUDTME2aiq9L53QYoj4mJ-EbKblTM.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
        
      })
  
      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
  
    } catch(err) {
      this.error = err
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
  
    } catch(err) {
      console.log(err)
    }
  
  }

  googleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }
  
  signOut() {
    this.afAuth.auth.signOut();
  }

}
