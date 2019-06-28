import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from 'rxjs';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  users: Observable<any>;
  // displayedColumns = ['id', 'name', 'gender', 'address', 'weight'];
  // dataSource;
  constructor(private fb: AngularFirestore) {}

  ngOnInit(): void {
    this.users = this.fb
      .collection("users")
      .valueChanges();
  }

  trackByIdx(i) {
    return i;
  }
}
