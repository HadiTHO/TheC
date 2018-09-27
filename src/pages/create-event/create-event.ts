import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EventDetail } from '../../models/event-detail/event-detail.interface';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';


@IonicPage()
@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {

  eventDetail = {} as EventDetail;
  eventDetailRef$: AngularFireList<EventDetail>;
  selectedPhoto;
  loading;
  currentImage;
  imageName;

  public volunteer: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private camera: Camera, public loadingCtrl:LoadingController) {
    this.eventDetailRef$ = this.database.list('event-list');
  }

  addEvent(eventDetail: EventDetail) {
    this.imageName = eventDetail.eventName;
    this.upload();
    this.eventDetailRef$.push({
      eventName: this.eventDetail.eventName,
      eventDesc: this.eventDetail.eventDesc,
      address: this.eventDetail.address,
      startDate: this.eventDetail.startDate,
      endDate: this.eventDetail.endDate,
      startTime: this.eventDetail.startTime,
      endTime: this.eventDetail.endTime,
      noV: this.eventDetail.noV,
      image: this.imageName,
      
    });

    this.eventDetail = {} as EventDetail;

    this.navCtrl.setRoot('HomePage'); 

  }

  upload(){
    if(this.selectedPhoto){
      var uploadTask =  storage().ref().child('images/'+this.imageName+'.jpg').put(this.selectedPhoto);
      uploadTask.then(this.onError);
    }
  }
  
  onError = (error) => {
    console.log(error);
    this.loading.dismiss();
  }

  

  toMap() {
    this.navCtrl.push('MapPage', {eName: this.eventDetail.eventName});
  }

  ionViewWillLoad() {
    this.eventDetail.address = this.navParams.get('address');
  }

  takePhoto(){

    const options : CameraOptions = {
    
      quality:100,
      targetHeight:200,
      targetWidth:200,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      correctOrientation: true,
    }
    
    this.camera.getPicture(options).then((ImageData)=>{
      this.loading = this.loadingCtrl.create({
        content: 'Taking photo :) '
      });
    
      this.loading.present();
      this.selectedPhoto = this.dataURLtoBlob('data:image/jpeg;base64,'+ImageData);
      this.loading.dismiss();
      this.currentImage = 'data:image/jpeg;base64,'+ImageData;
    
    },(err)=>{
      console.log(err);
    }) ;
    
    
    }
    
    
    dataURLtoBlob(dataURL){
    let binary = atob(dataURL.split(',')[1]);
    let array = [];
    for (let index = 0; index < binary.length; index++) {
      array.push(binary.charCodeAt(index));
    
    }
    return new Blob([new Uint8Array(array)],{type:'image/jpeg'});
    }
}
