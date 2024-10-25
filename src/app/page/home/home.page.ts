
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { GeolocationService } from '../../api/geolocation.service';
import { PfandlagerService } from '../../api/pfandlager.service';
import { PhotoService } from '../../api/photo.service';
import * as Leaflet from 'leaflet';
import * as L from 'leaflet.offline';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {
  map!: Leaflet.Map;
  layer!: Leaflet.Layer;
  propertyList = [];
  private locationLayerGroup = new Leaflet.LayerGroup();
  private trackLayerGroup = new Leaflet.LayerGroup();

  constructor(public geoLocation: GeolocationService, public pfandLager: PfandlagerService, public photoService: PhotoService) {
    const that = this;
    console.log('Homepage ts constructor');

    // Subscribe on GPS position updates
    this.geoLocation.geoTicker.subscribe((next) => {
      console.log(next);
      console.log('GPS subscribed');
      that.updateGpsMapPosition();
    });

  }

  onSave() {
    this.pfandLager.saveData();
    this.leafletSetBottle(this.map.getCenter());
  }

  onGeoPosUpdate() {
    this.geoLocation.getGeolocation();
    this.updateGpsMapPosition();
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.leafletInit();
  }

  ngAfterViewInit() {
    //  setTimeout(() => { this.map.invalidateSize(); },0);
  }

  ngOnDestroy() {
    this.map.remove();
  }

  ionViewWillLeave() {
    this.map.remove();
  }


  leafletInit() {
    const position = new Leaflet.LatLng(48.1365, 11.6825);

    this.map = new Leaflet.Map('map').setView(position, 16);

    const tileLayerOnline = Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'Online Layer'
    }).addTo(this.map);

    // offline baselayer, will use offline source if available
    const tileLayerOffline = L.tileLayerOffline('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Offline Layer'
    }).addTo(this.map);

    const control = L.savetiles(tileLayerOffline, {
      zoomlevels: [13, 16], // optional zoomlevels to save, default current zoomlevel
      confirm(layer, successCallback) {
        // eslint-disable-next-line no-alert
        if (window.confirm(`Save ${layer._tilesforSave.length}`)) {
          successCallback();
        }
      },
      confirmRemoval(layer, successCallback) {
        // eslint-disable-next-line no-alert
        if (window.confirm('Remove all the tiles?')) {
          successCallback();
        }
      },
      saveText:
        '<i class="fa fa-download" aria-hidden="true" title="Save tiles"></i>',
      rmText: '<i class="fa fa-trash" aria-hidden="true"  title="Remove tiles"></i>',
    });
    control.addTo(this.map);
    this.map.addLayer(this.locationLayerGroup);

    // layer switcher control
    const layerswitcher = new Leaflet.Control.Layers(
      {
        'Carto (online)': tileLayerOnline,
        'Openstreetmap (offline)': tileLayerOffline
      },
      {
        'GPS Position': this.locationLayerGroup,
        'GPS Track': this.trackLayerGroup,

      },
      { collapsed: false }
    ).addTo(this.map);



  }

  updateGpsMapPosition() {
    if (this.geoLocation.latitude) {
      const position = new Leaflet.LatLng(this.geoLocation.latitude, this.geoLocation.longitude);
      this.leafletSetCrosshair(position);
    }
  }

  leafletSetBottle(position: any) {
    if (this.map) {
      console.log('Map Position updated');
      const that=this;

      // Add in a crosshair for the map
      const bottleIcon = Leaflet.icon({
        iconUrl: '../../../../assets/icon/bottle.png',
        iconSize: [20, 20], // size of the icon
        iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
      });
      const bottle = Leaflet.marker(position, { icon: bottleIcon });
      this.map.addLayer(bottle);
      


    }
    else console.log('Map not defined');
  }

  // Set marker and center map
  leafletSetCrosshair(position: any) {
    if (this.map) {
      const that = this;
      console.log('Map Position updated', position);
      this.map.setView(position, 16);
      const markerCircle = Leaflet.circleMarker(position, {
        color: 'orange',
        fillColor: '#f03',
        fillOpacity: 0.1,
        radius: 20
      });
      markerCircle.setRadius(40);
      this.map.addLayer(markerCircle);
      this.map.on('move', function(e) {
        markerCircle.setLatLng(that.map.getCenter());
    });
    }
    else console.log('Map not defined');
  }

  leafletSetMarkerOnPosition() {
    const position = new Leaflet.LatLng(this.geoLocation.latitude, this.geoLocation.longitude);
    console.log('set marker');
    if (this.map) {
      this.map.setView(position, 16);
      var marker = Leaflet.marker(position).addTo(this.map);
      this.map.addLayer(marker);
    }
    else console.log('Map not defined');
  }

  onMapReady(map: Leaflet.Map) {
    this.map = map;
    console.log('Leaflet Map ready ');
  }

}
