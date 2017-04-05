import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { NewReviewPage } from "../new-review/new-review";
import { DataService } from "../../providers/data-service";

/*
  Generated class for the ConferenceInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-conference-info',
  templateUrl: 'conference-info.html'
})
export class ConferenceInfoPage {

  conInfo: any = {};
  conKey: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private _data: DataService, private zone: NgZone) {
    this.conInfo = this.navParams.get('info');
  }

  private addReview(){
    let reviewModal = this.modalCtrl.create(NewReviewPage, {conType: this.conInfo.type});

    reviewModal.onDidDismiss(data => {
      // console.log(data);
      if (data) {
        if (!this.conInfo.reviews) {
          this.conInfo.reviews = [];
        }
        this.conInfo.reviews.push(data);
        // console.log("Array: ", this.conInfo.reviews);
        if (data.rating > 0) {
          this.recalculateAggregation()
        }
        this.getConferenceID();
      }
    });
    reviewModal.present();
  }

  private recalculateAggregation() {
    let totalReviews = this.conInfo.reviews.length;
    let totalStars = 0;
    for(let review of this.conInfo.reviews){
      totalStars += review.rating;
    }

    this.conInfo.aggregate = ConferenceInfoPage.roundHalf(totalStars/totalReviews);
  }

  private static roundHalf(number: number) {
    return Math.round(number * 2) / 2;
  }

  handleDateTime(dateString){
    let date = new Date(dateString);
    // console.log("DATE", dateString);
    return date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();//prints expected format.
  }

  private getConferenceID() {
    this._data.base.ref('/conferences').once('value', (snap) => {
      let keys = Object.keys(snap.val());
      for(let key of keys){
        if(snap.val()[key].name === this.conInfo.name){
          this.conKey = key;
          break;
        }
      }

      this.pushReview();
    })
  }

  private pushReview() {
    let updates = {};
    updates['/conferences/' + this.conKey] = this.conInfo;

    // Saves places of interest to Database
    this._data.base.ref().update(updates).then(() => {
      console.log("Successfully updated!")
    }).catch((error) => {
      console.warn("Cannot update:", error);
    });
  }
}
