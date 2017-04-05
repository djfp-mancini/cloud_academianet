import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {

  public base: any;
  public auth: any;
  public users: any;
  public uid: string;

  public gProvider: any;
  public tProvider: any;
  public fProvider: any;

  public conferences: any;

  public static readonly GUEST_UID: string = "o0UxaIlJqWSYnXtibzG7x6nbOBr2";

  constructor() {}

  init(){
    const firebaseConfig = {
      apiKey: "AIzaSyDQuTZRC0CaIctwAyVlchP_J1shY-EN6jU",
      authDomain: "sofe-4870-project.firebaseapp.com",
      databaseURL: "https://sofe-4870-project.firebaseio.com",
      storageBucket: "sofe-4870-project.appspot.com",
      messagingSenderId: "114732260320"
    };

    firebase.initializeApp(firebaseConfig);

    this.base = firebase.database();
    this.auth = firebase.auth();
    this.users = this.base.ref('users');

    this.gProvider = new firebase.auth.GoogleAuthProvider();
    this.tProvider = new firebase.auth.TwitterAuthProvider();
    this.fProvider = new firebase.auth.FacebookAuthProvider();

  }

}
