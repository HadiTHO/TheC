import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { EventDetail } from '../../models/event-detail/event-detail.interface';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  new: EventDetail;

  eventRef$: AngularFireObject<EventDetail>;
  eventObs: Observable<EventDetail>;
  eventData =  {} as EventDetail;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private database: AngularFireDatabase) {

    // const eventID = this.navParams.get('eventID');
    // console.log(eventID);
    // this.eventRef$ = this.database.object(`event-list/${eventID}`);
    // this.eventObs.subscribe(eventData => this.eventData = eventData);
    
  }

  ionViewWillLoad() {
    this.new = this.navParams.get('new');
  }

}
