import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaskDetailPageRoutingModule } from './task-detail-routing.module';
import { TaskDetailPage } from './task-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TaskDetailPageRoutingModule,
  ],
  declarations: [TaskDetailPage],
})
export class TaskDetailPageModule {}