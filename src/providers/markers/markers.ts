import { Injectable } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore";

@Injectable()
export class MarkersProvider {
  constructor(private afs: AngularFirestore) {
    
  }

  saveMarker(coords, eName) {
    this.afs
      .collection("markers")
      .add({
        latitude: coords.latitude,
        longitude: coords.longitude,
        message: eName,
      })
      .then(() => {
        alert("Added");
      });
  }
 
  getAllMarkers() {
    return this.afs.collection("markers").valueChanges();
  }
}
