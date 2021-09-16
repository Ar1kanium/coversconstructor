import {Component, OnDestroy, OnInit} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',]
})
export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true
  }

}

