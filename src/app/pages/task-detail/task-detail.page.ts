import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/shared/services/database/database.service';
import { Task } from 'src/app/shared/services/database/database.service'

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit {
  public id: string = "";
  public task$: Observable<Task | undefined> |undefined;

  constructor(private readonly route: ActivatedRoute, private readonly databaseService: DatabaseService ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.task$ = this.databaseService.getTaskById(this.id);
      }
    });
  }

}
