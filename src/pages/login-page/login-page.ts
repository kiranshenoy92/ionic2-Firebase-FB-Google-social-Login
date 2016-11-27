import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Facebook , GooglePlus} from 'ionic-native';
import { ProfilePage } from '../profile/profile';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';


/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'login-page',
  templateUrl: 'login-page.html'
})
export class LoginPage {
 
  userProfile: any = null;
  constructor(public navCtrl: NavController, public loadingctr: LoadingController, public storage: Storage) {
    
  }

  navigate(username: any) {
    alert("trying to navigate")
    this.navCtrl.setRoot(ProfilePage,{user: username});
  }
  ionViewDidLoad() {
    console.log('Hello LoginPagePage Page');
    
  }
 
 facebookLogin(){
    Facebook.login(['email']).then( (response) => {
      let facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
      firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
          this.userProfile = success;
          this.storage.set('currentUser',this.userProfile).then((success)=>{
                console.log('username set');
              })
              .catch((error)=>{
                console.log('error');
              });
            this.storage.set('isLoggedIn' ,true).then((success)=>{
                console.log('login set');
              })
              .catch((error)=>{
                console.log('error');
              });
            this.navCtrl.setRoot(ProfilePage,{user: this.userProfile});
        })
        .catch((error) => {
         alert("Firebase failure: " + JSON.stringify(error));
        });
      }).catch((error) => { console.log(error) });
}

  
  

  googleLogin() {
    
    let loader = this.loadingctr.create({
               content: "Logging in ! Please wait..."
            });
    loader.present();
    GooglePlus.login({'webClientId':'245289322455-e9gm15qp76ku03342urd8qcigq6scq3j.apps.googleusercontent.com'})
      .then((response)=>{
       
        var provider = firebase.auth.GoogleAuthProvider.credential(response.idToken);
 
        firebase.auth().signInWithCredential(provider)
          .then((success) => {
            this.userProfile = success;
            this.storage.set('currentUser',this.userProfile).then((success)=>{
                console.log('username set');
              })
              .catch((error)=>{
                console.log('error');
              });
            this.storage.set('isLoggedIn' ,true).then((success)=>{
                console.log('login set');
              })
              .catch((error)=>{
                console.log('error');
              });
            this.navCtrl.setRoot(ProfilePage,{user: this.userProfile});
        })
          .catch((error) => {
            alert("Firebase failure: " + JSON.stringify(error));
            alert(error+"signInWithCredential failed")
        });
      })
      .catch((error)=>{
        alert("fail to login")
        alert(error)
      })
      
  }

 
}
