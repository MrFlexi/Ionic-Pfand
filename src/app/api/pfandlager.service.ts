import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { GeolocationService } from '../api/geolocation.service';
import { ReusableService } from '../api/reusable.service';

@Injectable({
  providedIn: 'root'
})

export class PfandlagerService {
  flaschenCount: number = 0;
  flaschenPfand: number = 0.00;

  flaschen: Flasche[];

  constructor(public geoLocation: GeolocationService, public reusable: ReusableService ) {
    const flaschenMap = new Map();
    this.flaschen = [
      { id: 1, type: '8cent', value: 0.08, count: 0, totalValue: 0.0 },
      { id: 2, type: '15cent', value: 0.15, count: 0, totalValue: 0.0 },
      { id: 3, type: '25cent', value: 0.25, count: 0, totalValue: 0.0 },
    ];

    for (const item of this.flaschen) {
      flaschenMap.set(item.id, item);
    }
  }

  calcTotal() {
    this.flaschenCount = 0;
    this.flaschenPfand = 0.00;
    for (const item of this.flaschen) {
      this.flaschenCount = this.flaschenCount + item.count;
      this.flaschenPfand = this.flaschenPfand + item.totalValue;
    }
  }


  add(type: any) {
    const a = this.flaschen.filter(x => x.type == type);
    console.log(a);
    if (a !== undefined) {
      a[0]["count"] = a[0]["count"] + 1;
      a[0]["totalValue"] = (a[0]["count"]) * (a[0]["value"]);
    }
    this.calcTotal();
  }

  saveData = async () => {
    // #1 Mapping the array to an object...
    let dateTime = new Date()
    const timestamp = { timestamp: dateTime };
    const geo = { geoLocation: this.geoLocation };
    const flaschenlager = { flaschenLager: this.flaschen }
    const obj = Object.assign({}, flaschenlager, geo, timestamp);

    const jsonString = JSON.stringify(obj)
    await Preferences.set({
      key: 'currentData',
      value: jsonString
    });
    this.reusable.showToast("Data saved");
  };

  loadData = async () => {
    const { value } = await Preferences.get({ key: 'name' });
    console.log(`Hello ${value}!`);
  };
}


interface Flasche {
  id: number;
  type: string;
  value: number;
  count: number;
  totalValue: number;
}
