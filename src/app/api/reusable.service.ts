import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ReusableService {

  constructor(public toastCtrl: ToastController) { }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 1000
    });
    toast.present();
  }
}
