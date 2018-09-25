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

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.eventDetailRef$ = this.database.list('event-list');
  }

  addEvent( eventDetail: EventDetail) {

    this.eventDetailRef$.push({
      eventName: this.eventDetail.eventName,
      eventDesc: this.eventDetail.eventDesc,
      lat: Number(this.eventDetail.lat),
      lgt: Number(this.eventDetail.lgt),
      eID: this.eventDetail.eventName + Math.random(),
    });

    this.eventDetail = {} as EventDetail;

    this.navCtrl.push('HomePage'); 

  }

}
