import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  barcode: any = 'no barcode';

  constructor(private barcodeScanner: BarcodeScanner) { }
  
  public async getBarcode() {
    // Take a photo
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.barcode = barcodeData;
    }).catch(err => {
      console.log('Error', err);
    });
  }
}