import {Component} from "@angular/core";
import {NavController, NavParams, ViewController, ModalController, AlertController} from "ionic-angular";
import {DataService} from "../../providers/data-service";
import {SignUpPage} from "../sign-up/sign-up";

// Some elements of this page (largely aesthtetic elements) were borrowed from
// https://devdactic.com/login-ionic-2/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  registerCredentials: any;
  loginError: boolean;
  errorMessage: string;

  readonly GUEST_EMAIL = 'notreal@email.com';
  readonly GUEST_PASSWORD = 'guestpass';


  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataService, private viewCtrl: ViewController, private modalCtrl: ModalController, private alertCtrl: AlertController) {
    this.registerCredentials = {};
    this.loginError = false;
    // LoginPage.facebookButton(document, 'script', 'facebook-jssdk')
  }

  createAccount() {
    console.log("Create account");
    let registerModal = this.modalCtrl.create(SignUpPage);

    registerModal.onDidDismiss((data) => {
      console.log(data);
      if (data !== null) {
        this.dismiss(data);
      }
    });

    registerModal.present();
  }

  login() {
    this._data.auth.signInWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.password).then((info) => {
      console.log("LOGGED IN!");
      this.dismiss(info.uid);
      this._data.uid = info.uid;
    }, (error) => {
      // Handle Errors here.
      this.errorMessage = error.message;
      console.error("ERR:", this.errorMessage);
      this.loginError = true;
      // ...
    });
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  signInAsGuest() {
    console.log("Logging in as Guest");
    this._data.auth.signInWithEmailAndPassword(this.GUEST_EMAIL, this.GUEST_PASSWORD).then((inf) => {
      this.dismiss(inf.uid);
      this._data.uid = inf.uid;
    }, error => {
      console.error("GUEST ERROR:", error.message);
      this.loginError = true;
    })

  }

  // ------ SOCIAL MEDIA SIGN IN METHODS -----\
  signInWithGoogle() {
    this._data.auth.signInWithPopup(this._data.gProvider).then((res) => {
      this.handleSignIn(res);
    })
      .catch(error => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
      });
  }

  signInWithTwitter() {
    this._data.auth.signInWithPopup(this._data.tProvider).then(result =>{
      this.handleSignIn(result);
      // ...
    }).catch(error =>{
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      // ...
      console.warn("ERR", error);
    });
  }

  signInWithFacebook() {
    this._data.auth.signInWithPopup(this._data.fProvider).then(result => {
      this.handleSignIn(result);
      // ...
    })
      .catch(error => {
        // Handle Errors here.
        console.log("ERR:", error);
        // ...
      });
  }

  handleSignIn (res: any, inc?: number, originalUname?: string) {
    let tmpUname;
    if(res.user.email){
      tmpUname = res.user.email.substring(0, res.user.email.indexOf("@")).replace(/\./g, '\_')
    }
    else{
      tmpUname = res.user.displayName.split(' ')[0];
    }
    console.log(originalUname);
    if(originalUname){
      tmpUname = originalUname + "" + inc;
    }
    else{
      originalUname = tmpUname;
    }
    // console.log(res);
    this._data.base.ref('usernames').once('value', snap => {
      // console.log("GOT:", snap.val());
      if (!snap.val()[tmpUname]) {
        console.log("Proceeding");
        console.log("Registered:", res);
        this.createNewUserEntry(res.user.uid, res.user.displayName, tmpUname);
        this.dismiss(res.user.uid);
        this._data.uid = res.user.uid;
        this.showRegisteredMessage();
        this.addToUnameIdx(tmpUname, this._data.uid);
      }
      else {
        // console.log(tmpUname + " already exists");
        if(snap.val()[tmpUname] !== res.user.uid){
          let matches = tmpUname.match(/\d+$/);
          // console.log(matches);
          if(matches){
            // recurse through until a valid and unused username is generated.
            this.handleSignIn(res, parseInt(matches[0]) + 1, originalUname)
          }
          else{
            // begin recursion if username is not found.
            this.handleSignIn(res, 1, originalUname);
          }
        }
        else{
          this._data.uid = res.user.uid;
          this.dismiss(res.user.uid);
        }
      }
    });
  }

  //----- END SOCIAL MEDIA SIGN IN METHODS -----/

  private addToUnameIdx(screenName: any, uid: string) {
    let newUname = {};
    newUname['/usernames/' + screenName] = uid;
    // Saves places of interest to Database
    this._data.base.ref().update(newUname).then(() => {
      console.log("Successfully updated!")
    }).catch((error) => {
      console.warn("Cannot update:", error);
    });
  }

  private showRegisteredMessage() {
    let alert = this.alertCtrl.create({
      title: 'Successfully Registered!',
      subTitle: 'You have successfully been registered and logged in!',
      buttons: ['Let\'s Go!']
    });
    alert.present();
  }

  private createNewUserEntry(uid: string, name: string, uname: string) {
    this._data.base.ref('users/' + uid).set({
      name: name,
      screenName: uname,
      isGuest: false
    });
  }

}
