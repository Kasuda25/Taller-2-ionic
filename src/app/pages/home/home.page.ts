import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private readonly authSrv: AuthService, private readonly loadingSrv: LoadingService) { }

  public async logOut(){
    await this.loadingSrv.present();
    await this.authSrv.logOut();
    await this.loadingSrv.dismiss();
  }
}
