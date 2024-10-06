import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type ColorButton = "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark";
type ButtonType = "button" | "submit" | "reset";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent  implements OnInit {
  @Input({ required: true }) value = "";
  @Input() type: ButtonType = "button";
  @Input() color: ColorButton = "success";
  @Input() disable = false;

  @Output() doClick = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  click(){
    this.doClick.emit(true);
  }


}
