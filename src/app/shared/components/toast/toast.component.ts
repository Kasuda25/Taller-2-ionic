import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      icon: 'globe',
      color: 'success',
      position: 'top'
    });
    toast.present();
  }

}
