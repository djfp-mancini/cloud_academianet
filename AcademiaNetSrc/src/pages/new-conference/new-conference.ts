import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {DataService} from "../../providers/data-service";

/*
  Generated class for the NewConference page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new-conference',
  templateUrl: 'new-conference.html'
})
export class NewConferencePage {

  newCon: any = {
    addedBy: "",
    name: "",
    acronym: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataService, private viewCtrl: ViewController) {
    this._data.base.ref('users').orderByKey().equalTo(this._data.uid).on('child_added', snap => {
      console.log(snap.val());
      this.newCon.addedBy = snap.val().screenName;
      this.newCon.type = 'c';
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewConferencePage');
  }

  dismiss(conInfo){
    if (conInfo !== null) {
      conInfo.dateAdded = (new Date(Date.now())).toISOString();
      if(conInfo.acronym === ""){
        conInfo.acronym = "N/A"
      }
    }

    this.viewCtrl.dismiss(conInfo);
  }

}
