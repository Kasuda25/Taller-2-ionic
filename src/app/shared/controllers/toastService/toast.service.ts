import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

type ColorType = 'success' | 'danger' | 'warning';
type IconType = 'checkmark' | 'close' | 'warning';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private ToastController: ToastController) { }

  public async presentToast(message: string, color: ColorType, icon: IconType){
    const toast = await this.ToastController.create({
      message: message,
      duration: 5000,
      color: color,
      icon: icon, 
      position: 'bottom',
      swipeGesture: "vertical"
    });
    toast.present();
  }
}
