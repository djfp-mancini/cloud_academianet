import {Component, NgZone} from '@angular/core';

import {NavController, AlertController, ModalController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {DataService} from "../../providers/data-service";
import * as $ from 'jquery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  name: string = "";
  version: string = "0.2";

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private modalCtrl: ModalController, private _data: DataService, private zone: NgZone) {
    this._data.base.ref('conferences').on('value', (snap) => {
      console.log(snap.val());
      let cons = snap.val();
      _data.conferences = $.map(cons, (value, idx) => {
        return [value];
      })
    })
  }

  ionViewDidLoad(){
    let loginModal = this.modalCtrl.create(LoginPage, {}, {showBackdrop: false, enableBackdropDismiss: false});

    loginModal.onDidDismiss(data => {
      console.log(data);
      this._data.base.ref('/users/' + this._data.uid).on('value', snap => {
        this.zone.run(() => {
          this.name = snap.val().name;
          this.initializeList()
        })
      })

    });
    loginModal.present();
  }

  ionViewWillEnter(){
    console.log("ACTIVE");
    this.initializeList();
  }

  initializeList(){
    console.log("List Initialization is a stub for now. Name:", this.name)
  }

  logout(){
    let confirm = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Logout Cancelled');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            location.reload();
          }
        }
      ]
    });

    confirm.present()
  }

}
