/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
import { ToastService } from 'src/app/shared/controllers/toastService/toast.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { DatabaseService } from 'src/app/shared/services/database/database.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  public title!: FormControl;
  public description!: FormControl;
  public taskForm!: FormGroup;

  constructor(private readonly authSrv: AuthService, private readonly dbSrv: DatabaseService, private readonly loadingSrv: LoadingService,
    private readonly nvctrl: NavController, private readonly toastSrv: ToastService, private datePipe: DatePipe) {
    this.initForm()

  }

  ngOnInit() {

  }

  public async doCreate() {
    try {
      await this.loadingSrv.show();
      const { title, description } = this.taskForm.value;
      const date = new Date();
      const taskData = {
        title: title,
        description: description,
        userId: await this.authSrv.getCurrentUid(),
        date: this.datePipe.transform(date, "yyyy-MM-dd"),
        done: false
      };
      await this.dbSrv.createTask(taskData);
      await this.loadingSrv.dismiss();
      this.nvctrl.navigateForward("home");
      await this.toastSrv.presentToast("Task created.", "success", "checkmark");
    } catch (error) {
      await this.loadingSrv.dismiss();
      await this.toastSrv.presentToast("There was an error creating the task.", "danger", "close");
      console.error(error);
    }
  }


  private initForm() {
    this.title = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.taskForm = new FormGroup({
      title: this.title,
      description: this.description
    })
  }

}
