import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { MyLeavesPage } from '../pages/my-leaves/my-leaves';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { AppErrorHandlerProvider } from '../providers/app-error-handler/app-error-handler';
import { ReportTeamPage } from '../pages/report-team/report-team';
import { ReportAnnualPage } from '../pages/report-annual/report-annual';
import { ReportReporteePage } from '../pages/report-reportee/report-reportee';
import { TeamServiceProvider } from '../providers/team-service/team-service';
import { DetailsviewPage } from '../pages/detailsview/detailsview';

import { FirebaseConfig } from '../app/firebase.config';
import { IonicProConfig } from '../app/ionic.pro.config';
import { Camera } from '@ionic-native/camera';
import { ImageProvider } from '../providers/image-service/image-service';
import { ChartsModule } from 'ng2-charts';
import { EmailServiceProvider } from '../providers/email-service/email-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LeaveServicev2Provider } from '../providers/leave-servicev2/leave-servicev2';
import { AppContextProvider } from '../providers/app-context/app-context';
import { ToastMessageProvider } from '../providers/toast-message/toast-message';
import { UserServiceV2Provider } from '../providers/user-service-v2/user-service-v2';
import{commentsController} from '../components/controllers/comments-controller';
import { PipesModule } from '../pipes/pipes.module';
import { IonicImageViewerModule } from 'ionic-img-viewer';  
import { BadgeCounterProvider } from '../providers/badge-counter';
import { NotificationServiceV2 } from '../providers/notification-service-v2/notification-service-v2';

@NgModule({
  declarations: [
    MyApp,
    // ReportTeamPage,
    // ReportAnnualPage,
    // ReportReporteePage,
    DetailsviewPage
  ],
  imports: [    
    BrowserModule,
    HttpClientModule,
   // BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ChartsModule,
    PipesModule,
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // ReportTeamPage,
    // ReportAnnualPage,
    // ReportReporteePage,
    DetailsviewPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,    
    AuthServiceProvider,
    UserServiceProvider,
    TeamServiceProvider,
    Camera,
    ImageProvider,
    EmailServiceProvider,
    LeaveServicev2Provider,
    UserServiceV2Provider,
    commentsController,
    AppContextProvider,
    ToastMessageProvider,
    BadgeCounterProvider,
    NotificationServiceV2,
    IonicErrorHandler,
    [{provide: ErrorHandler, useClass: AppErrorHandlerProvider}],
    
  ]
})
export class AppModule {}
