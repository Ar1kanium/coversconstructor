import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  storeToLocal = (obj:object):void => {
    for (const [key, val] of Object.entries(obj)) {
      localStorage.setItem(key, val)
    }
  }

  getFromLocal = (key:string) => {
    return localStorage.getItem(key) ? localStorage.getItem(key) : ''
}
}
