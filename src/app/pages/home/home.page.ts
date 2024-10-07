import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { DatabaseService, Task } from 'src/app/shared/services/database/database.service';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userTasks$!: Observable<Task[]>;

  constructor(private readonly navCtrl: NavController, private readonly authSrv: AuthService, private readonly dbSrv: DatabaseService, private readonly loadingsrv: LoadingService) { }

  ngOnInit() {
    this.loadUserTasks();
  }

  public async profile() {
    this.navCtrl.navigateForward("profile");
  }

  public async addTask() {
    this.navCtrl.navigateForward("tasks");
  }

  private async loadUserTasks() {
    await this.loadingsrv.show();
    const userId = await this.authSrv.getCurrentUid();
    this.userTasks$ = this.dbSrv.getuserTasks(userId);
    await this.loadingsrv.dismiss();
  }

  public viewTask(id: string = '') {
    this.navCtrl.navigateForward(`task-detail/${id}`);
  }
}
