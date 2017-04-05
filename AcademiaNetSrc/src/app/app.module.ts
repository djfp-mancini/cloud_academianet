import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {DataService} from "../providers/data-service";
import {LoginPage} from "../pages/login/login";
import {SignUpPage} from "../pages/sign-up/sign-up";
import {SearchPage} from "../pages/search/search";
import {SearchResultsPage} from "../pages/search-results/search-results";
import {ConferenceInfoPage} from "../pages/conference-info/conference-info";
import {Ionic2RatingModule} from "ionic2-rating";
import {NewReviewPage} from "../pages/new-review/new-review";
import {NewConferencePage} from "../pages/new-conference/new-conference";

@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignUpPage,
    SearchResultsPage,
    ConferenceInfoPage,
    NewReviewPage,
    NewConferencePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignUpPage,
    SearchResultsPage,
    ConferenceInfoPage,
    NewReviewPage,
    NewConferencePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, DataService]
})
export class AppModule {}
