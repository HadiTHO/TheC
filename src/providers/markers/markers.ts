import { Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from "angularfire2/firestore";

@Injectable()
export class MarkersProvider {
  public eName: string;
  constructor(private afs: AngularFirestore, public navCtrl: NavController, public navParams: NavParams) {
    console.log("Hello MarkersProvider Provider");
    this.eName = this.navParams.get('eName');
  }

  saveMarker(coords) {
    this.afs
      .collection("markers")
      .add({
        latitude: coords.latitude,
        longitude: coords.longitude,
        message: this.eName,
      })
      .then(() => {
        alert("Added");
      });
  }
 
  getAllMarkers() {
    return this.afs.collection("markers").valueChanges();
  }
}
