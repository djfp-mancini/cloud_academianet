import {Component, DoCheck} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {DataService} from "../../providers/data-service";
import * as $ from 'jquery';
import {ConferenceInfoPage} from "../conference-info/conference-info";
import {NewConferencePage} from "../new-conference/new-conference";

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage{

//   searchParams: any = {
//     title: "",
//     type: ""
// };
  query: any = {
    string: ""
  };

  limit: number;

  conferences: Array<any> = [];

  constructor(private navCtrl: NavController, public navParams: NavParams, private _data: DataService, private modalCtrl: ModalController) {
    this.limit = 30;
    this.conferences = _data.conferences;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  ionViewWillEnter(){
    this.initializeItems();
  }

  getItems(ev: any) {
    this.limit = 30;
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.conferences = $.grep(this.conferences, (value, indexInArray) => {
        let vv = val.toLowerCase();
        return (
          value.name.toLowerCase().includes(vv)
          || value.acronym.toLowerCase().includes(vv)
        );
      })
    }
  }

  // searchAcademiaNet(){
  //   console.log("Searching:", this.searchParams);
  //   if(this.searchParams.type === "acronym"){
  //     this.searchParams.title = this.searchParams.title.toUpperCase();
  //   }
  //   this.navCtrl.push(SearchResultsPage, {params: this.searchParams});
  // }

  private initializeItems() {
    let cons = {};
    this._data.base.ref('conferences').on('value', (snap) => {
      console.log(snap.val());
      cons = snap.val();
      this.conferences = $.map(cons, (value, idx) => {
        return [value];
      })
    })
  }

  openConferenceInfo(selectedConference){
    this.navCtrl.push(ConferenceInfoPage, {info: selectedConference})
  }

  private addConference(){
    let newConModal = this.modalCtrl.create(NewConferencePage, {});

    newConModal.onDidDismiss(data => {
      // console.log(data);
      if (data) {
        this._data.base.ref('/conferences').push(data);
        this.navCtrl.push(ConferenceInfoPage, {info: data})
      }
    });
    newConModal.present();
  }

  private loadMoreConferences(){
    this.limit += 20;
  }
}
