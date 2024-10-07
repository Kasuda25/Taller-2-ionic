import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
import { ToastService } from 'src/app/shared/controllers/toastService/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public id: string = "";

  constructor(private readonly authSrv: AuthService, private readonly loadingSrv: LoadingService, private readonly navCtrl: NavController, private readonly toastSrv: ToastService) { }

  async ngOnInit() {
    this.id = await this.authSrv.getCurrentUid();
  }

  public async logOut() {
    await this.loadingSrv.show();
    await this.authSrv.logOut();
    await this.loadingSrv.dismiss();
    this.navCtrl.navigateForward("");
    await this.toastSrv.presentToast("Session has been closed", "success", "checkmark");
  }

  public async update() {
    this.navCtrl.navigateForward(`register/${this.id}`);
  }

}
