import { Component, OnInit } from '@angular/core';
import {ICover} from "../../models/ICover";
import {IBadge} from "../../models/IBadge";
import {FirebaseService} from "../../services/firebase.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-diary-constructor',
  templateUrl: './diary-constructor.component.html',
  styleUrls: ['./diary-constructor.component.css']
})
export class DiaryConstructorComponent implements OnInit{

  covers: ICover[] | [] = []
  badges: IBadge[] | [] = []
  lettering: string = ''
  fontSize: number = 15
  chosenCover?: ICover
  chosenBadge?: IBadge
  constructor(private fb: FirebaseService) {
    const coversSubscription:Subscription = fb.covers.subscribe((el:ICover[]) => {
      this.covers = el
      coversSubscription.unsubscribe()
    })
    const badgesSubscription:Subscription = fb.badges.subscribe((el:IBadge[]) => {
      this.badges = el
      badgesSubscription.unsubscribe()
    })
  }

  ngOnInit(): void {
  }

  ifCoverChosen = ():boolean => !!this.chosenCover

  ifBadgeChosen = ():boolean => !!this.chosenBadge

  ifLetteringExist = ():boolean => (this.lettering.length > 0)

  countPrice = (): number => {
    let countSum = 0
    if (this.chosenCover) countSum+=this.chosenCover.price
    if (this.chosenBadge) countSum+=this.chosenBadge.price
    return countSum
  }
  getFontSize = ():string => `${this.fontSize}px`


}
