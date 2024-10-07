import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private readonly navCtrl: NavController) { }

  public async profile(){
    this.navCtrl.navigateForward("profile");
  }

  public async addTask(){
    this.navCtrl.navigateForward("tasks");
  }
}
