import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { MyLeavesPage } from '../pages/my-leaves/my-leaves';
// import { CreateLeaveRequestPage } from '../pages/create-leave-request/create-leave-request';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "SigninPage";

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public authService: AuthServiceProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: "HomePage" },
      { title: 'My Profile', component: "UserProfilePage" },
      { title: 'My Leaves', component: "MyLeavesPage" },
      // { title: 'New Leave', component: CreateLeaveRequestPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
    if (page.component == "HomePage") {
      this.nav.setRoot(page.component);
    }
    else {
      this.nav.push(page.component);
    }
  }

  signOut(){
    this.authService.signOut();
    this.nav.setRoot("SigninPage");
  }
}
