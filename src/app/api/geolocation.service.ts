import { Injectable } from '@angular/core';
import { Geolocation, Position} from '@capacitor/geolocation';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReusableService } from '../api/reusable.service';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
latitude: any;
longitude: any;
speed: any;
altitude: any;
timestamp: any;

public geoTicker: Observable<any>;

constructor(public reusable: ReusableService) {

  if (!Geolocation.checkPermissions())
  {
    console.log('GPS request position');
    Geolocation.requestPermissions();
  }
  

  this.geoTicker = new Observable((observer) => {
    let watchId: any;
    // Simple geolocation API check provides values to publish
    if ('geolocation' in navigator) {
      watchId = Geolocation.watchPosition({}, (position, err) => {
        console.log('Watch', position);
        this.latitude = position?.coords.latitude;
        this.longitude = position?.coords.longitude;
        this.speed = position?.coords.speed;
        this.altitude = position?.coords.altitude;
        this.timestamp = position?.timestamp;

        observer.next(position);    // Bradcast actual position
      });
    }
    else
    {
      console.log('The browser does not support geolocation');
    }
  });

  this.geoTicker.subscribe({
    next(position){
      console.log('Position Update: ', position);
      reusable.showToast("GPS update");
    }
  });
 }

 async getGeolocation(){
  const coordinates = await Geolocation.getCurrentPosition();
  this.latitude = coordinates.coords.latitude;
  this.longitude = coordinates.coords.longitude;
  this.speed = coordinates.coords.speed;
 }

}
