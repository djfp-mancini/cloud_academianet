import {Component, DoCheck} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {DataService} from "../../providers/data-service";

/*
  Generated class for the NewReview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new-review',
  templateUrl: 'new-review.html'
})
export class NewReviewPage implements DoCheck{
  ngDoCheck(): void {
    if(this.isAnon){
      this.userName = "Anonymous"
    }
    else{
      this.userName = this.userNameBackup;
    }
  }

  review: any = {
    rating: 0,
    title: "",
    body: "",
    year: new Date(Date.now()).toISOString()
  };

  userName: string;
  userNameBackup: string;
  uid: string;
  GUEST_UID: string;

  isAnon: boolean = false;

  type: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataService, private viewCtrl: ViewController) {
    this._data.base.ref('users').orderByKey().equalTo(this._data.uid).on('child_added', snap => {
      console.log(snap.val());
      this.userName = snap.val().screenName;
      this.userNameBackup = snap.val().screenName;
      this.uid = _data.uid;
      this.GUEST_UID = DataService.GUEST_UID;

      this.type = this.navParams.get('conType');

      console.log(this.uid);
      console.log(this.GUEST_UID);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewReviewPage');
  }

  dismiss(reviewInfo){
    if (reviewInfo !== null) {
      reviewInfo.userName = this.userName;
      reviewInfo.dateTime = Date.now();
      reviewInfo.uid = this.uid;
    }
    this.viewCtrl.dismiss(reviewInfo);
  }
}
