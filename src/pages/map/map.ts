import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import leaflet from 'leaflet';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { MarkersProvider } from "../../providers/markers/markers";


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  public eName: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,private nativeGeocoder: NativeGeocoder, public markersProvider: MarkersProvider) {
    this.eName = this.navParams.get('eName');
  }
 
  ionViewDidEnter() {
    this.loadmap();
  }
 
  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Cavalry',
      maxZoom: 14
    }).addTo(this.map);
    // this.loadMarkers();

    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        alert('You are here!');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
      });
  }
 
  addMarker() {
    let prompt = this.alertCtrl.create({
      title: 'Add Marker',
      message: "Enter Adress",
      inputs: [
        {
          name: 'Address',
          placeholder: 'City'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            
            this.geoCodeandAdd(data.city);
            this.retrieveAddress(data.City);
          }
        }
      ]
    });
    prompt.present();
  }
 
  geoCodeandAdd(city) {
    this.nativeGeocoder.forwardGeocode(city)
      .then((coordinates: NativeGeocoderForwardResult[]) => {
      //   let markerGroup = leaflet.featureGroup();
      //   let marker: any = leaflet.marker([parseFloat(coordinates[0].latitude), parseFloat(coordinates[0].longitude)]).on('click', () => {
      //     alert('Marker clicked');
      // })
      // markerGroup.addLayer(marker);
      // this.map.addLayer(markerGroup);
      // })

      this.markersProvider.saveMarker(coordinates[0]);
      this.navCtrl.push('MarkerProvider', {eName: this.eName});
    })
  .catch((error: any) => console.log(error));
  }

  // loadMarkers() {
  //   this.markersProvider.getAllMarkers().subscribe((markers: any) => {
  //     markers.forEach(singlemarker => {
  //       let markerGroup = leaflet.featureGroup();
 
  //       let marker: any = leaflet
  //         .marker([singlemarker.latitude, singlemarker.longitude])
  //         .on("click", () => {
  //           alert(singlemarker.message);
  //         });
  //       markerGroup.addLayer(marker);
  //       this.map.addLayer(markerGroup);
  //     });
  //   });
  // }

  retrieveAddress(city) {
    this.navCtrl.push('CreateEventPage', {address: city})
  }

}
