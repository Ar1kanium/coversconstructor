import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {ICover} from "../models/ICover";
import {IBadge} from "../models/IBadge";
import {Observable} from "rxjs";

@Injectable()
export class FirebaseService {
  private coversCollection: AngularFirestoreCollection<ICover>
  private badgesCollection: AngularFirestoreCollection<IBadge>
  covers: Observable<ICover[]>
  badges: Observable<IBadge[]>

  constructor(private afs: AngularFirestore) {
    this.coversCollection = afs.collection<ICover>('covers')
    this.badgesCollection = afs.collection<IBadge>('badges')
    this.covers = this.coversCollection.valueChanges()
    this.badges = this.badgesCollection.valueChanges()
  }
}
