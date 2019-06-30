import { Component, OnInit, ViewChild } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, BehaviorSubject } from "rxjs";
import { map, tap, mergeMap, scan, throttleTime, reduce } from "rxjs/operators";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  lastDocView$ = new BehaviorSubject<any>(null); // Get the last ID value of the current sub-data.
  dataShowOnScreen$: Observable<any[]>; // Show data
  stop = new BehaviorSubject<boolean>(false); // Stop when all data gone.

  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  constructor(private fb: AngularFirestore) {}

  ngOnInit(): void {
    //TODO: dữ liệu mà dạng observable thì cần thêm $ ở cuối để dễ phân biệt với data thường
    const dataScroll = this.lastDocView$.pipe(
      mergeMap(val => this.getSubData(val)),
      scan((acc, cur) => {
        console.log(acc);
        console.log(cur);
        return { ...acc, ...cur };
      }, {})
    );

    this.dataShowOnScreen$ = dataScroll.pipe(
      map(v => {
        console.log(Object.values(v));
        return Object.values(v);
      })
    );
  }

  getSubData(lastDocView) {
    return this.fb
      .collection("users", ref =>
        ref
          .orderBy("id", "asc")
          .startAfter(lastDocView)
          .limit(20)
      )
      .snapshotChanges()
      .pipe(
        tap(doc => {
          console.log(doc);
          if (doc.length === 0) {
            console.log('check');
            this.stop.next(true);
          }
        }),
        map(arr => {
          return arr.reduce((acc, cur) => {
            const id = cur.payload.doc.id;
            const data = cur.payload.doc.data();
            return { ...acc, [id]: data };
          }, {});
        })
      );
  }

  nextData(e, lastDocView) {
    if (this.stop.value) {
      return;
    }
    const dataLen = this.viewport.getDataLength();
    const range = this.viewport.getRenderedRange().end;
    console.log(dataLen, " ", range);
    if (dataLen === range) {
      this.lastDocView$.next(lastDocView);
    }
    return null;
  }

  trackByIdx(i) {
    return i;
  }
}
