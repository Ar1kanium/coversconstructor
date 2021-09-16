import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryConstructorComponent } from './diary-constructor.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {FirebaseService} from "../../services/firebase.service"
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";
import {TabViewModule} from "primeng/tabview";
import {ButtonModule} from "primeng/button";
import {SliderModule} from "primeng/slider";



@NgModule({
  declarations: [
    DiaryConstructorComponent
  ],
  exports: [
    DiaryConstructorComponent
  ],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    DropdownModule,
    TabViewModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    SliderModule,
  ],
  providers: [
    FirebaseService
  ],
})
export class DiaryConstructorModule { }
