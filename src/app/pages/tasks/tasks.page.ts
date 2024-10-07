import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  public title!: FormControl;
  public description!: FormControl;
  public taskForm!: FormGroup;

  constructor() {

   }

  ngOnInit() {

  }

  public doCreate(){
    
  }


  private initForm(){
    this.title =new FormControl('', [Validators.required]);
    this.description = new FormControl('',[Validators.required]);
    this.taskForm = new FormGroup({
      title: this.title,
      description: this.description
    })
  }

}
