import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, IonicPage, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
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

  newEventListRef$ : AngularFireList<EventDetail>;
  newEventList$: Observable<EventDetail[]>;
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

    this.newEventListRef$ = this.database.list<EventDetail>('event-list');
    this.newEventList$ = this.newEventListRef$.valueChanges();
    
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

  toEvent(EventDetail: EventDetail) {
    this.navCtrl.push('EventPage', 
      { eventID: EventDetail.$key })
  }

  toMap() {
    this.navCtrl.push('MapPage');
  }

}
