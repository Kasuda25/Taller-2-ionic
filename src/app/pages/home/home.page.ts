import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private readonly authSrv: AuthService, private readonly loadingSrv: LoadingService, 
    private readonly navCtrl: NavController
  ) { }

  public async logOut(){
    await this.loadingSrv.show();
    await this.authSrv.logOut();
    await this.loadingSrv.dismiss();
    this.navCtrl.navigateForward("");
  }
}
