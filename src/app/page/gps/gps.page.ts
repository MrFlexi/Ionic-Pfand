import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../../api/geolocation.service';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.page.html',
  styleUrls: ['./gps.page.scss'],
})
export class GpsPage implements OnInit {

  constructor(public geoLocation: GeolocationService) {}

  ngOnInit() {
  }

}
