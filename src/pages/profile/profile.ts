import { Component, OnInit } from '@angular/core';
import { NavController , NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login-page/login-page'
/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit{
  currentUser : any;
  constructor(public navCtrl: NavController, public navparam: NavParams, public storage: Storage) {
   // this.currentUser = this.navparam.get('user');
    
  }

  ngOnInit() {
    
      this.currentUser = this.navparam.get('user');
              
  }  


  ionViewDidLoad() {
    console.log('Hello ProfilePage Page');
  }
  logout() {
    this.navCtrl.setRoot(LoginPage);
    this.storage.remove('currentUser').then((success)=>{
                console.log('user removed');
              })
              .catch((error)=>{
                console.log('error');
              });
    this.storage.remove('isLoggedIn').then((success)=>{
                console.log('logged out');
              })
              .catch((error)=>{
                console.log('error');
              });
  }
}
