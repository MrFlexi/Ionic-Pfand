import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/page/home', icon: 'home' },
    { title: 'Settinges', url: '/folder/Outbox', icon: 'settings' },
    { title: 'GPS', url: '/page/gps', icon: 'navigate' },
    { title: 'Database', url: '/folder/Favorites', icon: 'folder' },    
  ];
  public labels = [];
  constructor() {}
}
