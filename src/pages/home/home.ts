import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, IonicPage, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { EventDetail } from '../../models/event-detail/event-detail.interface';
import { Observable } from 'rxjs';
import { storage } from 'firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;

  SwipedTabsIndicator :any= null;
  tabs:any=[];

  eventListRef$: AngularFireList<EventDetail>;
  // updateEventRef$: AngularFireObject<EventDetail>;
  eventList$: Observable<EventDetail[]>;
  updateEvent = {} as EventDetail;
  imageSource;
  eventPhoto;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private database: AngularFireDatabase) {
      
    this.tabs=["New", "Upcoming"];
    
    this.database.list<EventDetail>('event-list').valueChanges().subscribe((eventData) => { 
      console.log("Event details data", eventData);
    }, (err)=>{
   console.log("Error while retrieving event details : ", err);
    }); 

    // this.newEventListRef$ = this.database.list('event-list');

    // const updateEventid = this.navParams.get('updateEventid')
    
    this.eventListRef$ = this.database.list<EventDetail>('event-list');
    // this.updateEventRef$ = this.database.object('event-list');
    this.eventList$ = this.eventListRef$.valueChanges();
    
  }

  getPhotoURL(image){
    storage().ref().child('images/'+ image+'.jpg').getDownloadURL().then((url)=>{
    this.eventPhoto = url;
 
   })
 }
  
  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
  }

  selectTab(index) {    
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
      // this condition is to avoid passing to incorrect index
  	if( this.SwipedTabsSlider.length()> this.SwipedTabsSlider.getActiveIndex())
  	{
  		this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.SwipedTabsSlider.getActiveIndex() * 100)+'%,0,0)';
  	}
    
    }

  animateIndicator($event) {
  	if(this.SwipedTabsIndicator)
   	    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedTabsSlider.length()-1))*100) + '%,0,0)';
  }

  // toEvent(eventDetail: EventDetail) {
  //   this.navCtrl.push('EventPage', 
  //     { eventID: eventDetail.$key })
  // }

  toMap() {
    this.navCtrl.push('MapPage');
  }

joinAdd(updateEvent: EventDetail,) {
    this.updateEvent.$key = this.updateEvent.$key,
    this.updateEvent.eventName = this.updateEvent.eventName,
    this.updateEvent.eventDesc = this.updateEvent.eventDesc,
    this.updateEvent.address = this.updateEvent.address,
    this.updateEvent.startDate = this.updateEvent.startDate,
    this.updateEvent.endDate = this.updateEvent.endDate,
    this.updateEvent.startTime = this.updateEvent.startTime,
    this.updateEvent.endTime = this.updateEvent.endTime,
    this.updateEvent.noV = this.updateEvent.noV,
    this.updateEvent.image = this.updateEvent.image,
    this.updateEvent.join = this.updateEvent.join++;
    
    this.eventListRef$.update(this.updateEvent.$key, updateEvent);

  }

}
