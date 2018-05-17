import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as firebase from 'firebase';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { commonMethods } from '../../helper/common-methods';
import { ToastController } from 'ionic-angular';
import { AppContextProvider } from '../../providers/app-context/app-context';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signInForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, private _Cmmethods: commonMethods,
    private formBuilder: FormBuilder,
    private appContext: AppContextProvider,
    private authService: AuthServiceProvider) {
    this.signInForm = this.formBuilder.group({
      userid: [null, ([Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}$'), Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User is already logged in");
        this.appContext.myAccount.next(user);
        this.navCtrl.setRoot("HomePage");
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  navToSignup() {
    this.navCtrl.push('SignupPage');
  }

  forgotPassword() {
    this.navCtrl.push('ForgotPasswordPage');
  }

  signIn() {
    this._Cmmethods.InitializeLoader();
    this.authService.signIn(this.signInForm.value).then(res => {
      if(res) {
        this.appContext.myAccount.next(res);
        this.navCtrl.setRoot("HomePage");
        this._Cmmethods.loader.dismiss();
      } else {
        this.appContext.clearAppState();
      }
    }, err => {
      var errorCode = err.code;
      var errorMessage = err.message;
      this._Cmmethods.loader.dismiss();
      this.authService.presentToast(errorMessage);
    });
  }

}
