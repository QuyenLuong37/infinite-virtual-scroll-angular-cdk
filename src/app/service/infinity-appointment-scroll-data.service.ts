import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InfinityAppointmentScrollDataService {

  constructor(private fb: AngularFirestore) { }

  getDataFromFirebase(lastDocView): Observable<any> {
    return this.fb
    .collection("users", ref =>
      ref
        .orderBy("id", "asc")
        .startAfter(lastDocView)
        .limit(20)
    )
    .snapshotChanges();
  }
}
