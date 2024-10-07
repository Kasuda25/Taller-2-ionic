import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DatabaseService, Task } from 'src/app/shared/services/database/database.service';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/controllers/toastService/toast.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit {
  public id: string = "";
  public task$: Observable<Task | undefined> | undefined;
  public isEditing = false;
  public taskForm!: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly databaseService: DatabaseService,
    private readonly navCtrl: NavController,
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.task$ = this.databaseService.getTaskById(this.id);
        this.task$.subscribe(task => {
          if (task) {
            this.taskForm = this.fb.group({
              title: [task.title, Validators.required],
              description: [task.description, Validators.required],
              date: [task.date, Validators.required],
              done: [task.done]
            });
          }
        });
      }
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  editTask() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  async saveTask() {
    if (this.id && this.taskForm.valid) {
      try {
        await this.databaseService.updateTask(this.id, this.taskForm.value);
        this.showToast('Tarea actualizada con éxito', 'success', 'checkmark');
        this.isEditing = false;
      } catch (error) {
        this.showToast('Hubo un error al actualizar la tarea', 'danger', 'close');
      }
    }
  }

  async deleteTask() {
    if (this.id) {
      try {
        await this.databaseService.deleteTask(this.id);
        this.showToast('Tarea eliminada con éxito', 'success', 'checkmark');
        this.goBack();
      } catch (error) {
        this.showToast('Hubo un error al eliminar la tarea', 'danger', 'close');
      }
    }
  }

  private async showToast(message: string, color: 'success' | 'danger' | 'warning', icon: 'checkmark' | 'close' | 'warning') {
    await this.toastService.presentToast(message, color, icon);
  }
}
