import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DataService} from "../../providers/data-service";
import {ConferenceInfoPage} from "../conference-info/conference-info";

/*
  Generated class for the SearchResults page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html'
})
export class SearchResultsPage {

  searchResults: Array<any> = [];
  res: any = {
    tite: "",
    type: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataService) {
    this.res = navParams.get("params");
    console.log(this.res);
    let ref = this._data.base.ref("/conferences");
    ref.orderByChild(this.res.type).equalTo(this.res.title).on("child_added", (snapshot) => {
      // console.log("RESULT:", snapshot.val());

      this.searchResults.push(snapshot.val())
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultsPage');
  }

  openConferenceInfo(selectedConference){
    console.log("STUB: Opening info page");
    this.navCtrl.push(ConferenceInfoPage, selectedConference)
  }

}
