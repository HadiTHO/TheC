import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, private alertCtrl: AlertController,private nativeGeocoder: NativeGeocoder, public markersProvier: MarkersProvider) {
 
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
    this.loadMarkers();

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

      this.markersProvier.saveMarker(coordinates[0]);
    })
  .catch((error: any) => console.log(error));
  }

  loadMarkers() {
    this.markersProvier.getAllMarkers().subscribe((markers: any) => {
      markers.forEach(singlemarker => {
        let markerGroup = leaflet.featureGroup();
 
        let marker: any = leaflet
          .marker([singlemarker.latitude, singlemarker.longitude])
          .on("click", () => {
            alert(singlemarker.message);
          });
        markerGroup.addLayer(marker);
        this.map.addLayer(markerGroup);
      });
    });
  }

}
