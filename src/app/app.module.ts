import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {DiaryConstructorModule} from "./content/diary-constructor/diary-constructor.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ScrollingModule,
    DiaryConstructorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
