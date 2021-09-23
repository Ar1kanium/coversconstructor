import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryConstructorComponent } from './diary-constructor.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {FirebaseService} from "../../services/firebase.service"
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";
import {TabViewModule} from "primeng/tabview";
import {ButtonModule} from "primeng/button";
import {SliderModule} from "primeng/slider";
import {ToastModule} from "primeng/toast";
import {DialogService, DynamicDialogModule} from "primeng/dynamicdialog";
import {ContactFormComponent} from "../contact-form/contact-form.component";
import {InputMaskModule} from "primeng/inputmask";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MessageService} from "primeng/api";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";



@NgModule({
  declarations: [
    DiaryConstructorComponent,
    ContactFormComponent,
  ],
  exports: [
    DiaryConstructorComponent,
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
    ToastModule,
    DynamicDialogModule,
    InputMaskModule,
    InputTextareaModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule,
  ],
  entryComponents: [
    ContactFormComponent
  ],
  providers: [
    FirebaseService,
    MessageService,
    DialogService,
  ],
})
export class DiaryConstructorModule { }
