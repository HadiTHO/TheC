import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventDetail } from '../../models/event-detail/event-detail.interface';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {

  eventDetail = {} as EventDetail;
  eventDetailRef$: AngularFireList<EventDetail>;
  eventID;

  public volunteer: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.eventDetailRef$ = this.database.list('event-list');
  }

  addEvent( eventDetail: EventDetail) {

    this.eventDetailRef$.push({
      eventName: this.eventDetail.eventName,
      eventDesc: this.eventDetail.eventDesc,
      address: this.eventDetail.address,
      startDate: this.eventDetail.startDate,
      endDate: this.eventDetail.endDate,
      startTime: this.eventDetail.startTime,
      endTime: this.eventDetail.endTime,
      noV: this.eventDetail.noV,
      
    });

    this.eventDetail = {} as EventDetail;

    this.navCtrl.push('HomePage'); 

  }

  toMap() {
    this.navCtrl.push('map', {eName: this.eventDetail.eventName});
  }

  ionViewWillLoad() {
    this.eventDetail.address = this.navParams.get('address');
  }
}
