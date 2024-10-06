import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private ToastController: ToastController) { }

  public async presentToast(message: string, color: 'success', icon: 'checkmark'){
    const toast = await this.ToastController.create({
      message,
      duration: 2000,
      color: color,
      icon: icon, 
      position: 'top', 
    });
    toast.present();
  }
}
