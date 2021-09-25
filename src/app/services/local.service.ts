import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  storeToLocal = (storedData:object):void => {
    for (const [key, val] of Object.entries(storedData)) {
      localStorage.setItem(key, val)
    }
  }

  getFromLocal = (key:string) => {
    return localStorage.getItem(key) || ''
}
}
