import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventDetail } from '../../models/event-detail/event-detail.interface';

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  new: EventDetail;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,) {

  }

  ionViewWillLoad() {
    this.new = this.navParams.get('new');
  }

}
