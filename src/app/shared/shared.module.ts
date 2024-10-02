import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';

const component = [InputComponent]

@NgModule({
  declarations: [ ... component],
  imports: [
    CommonModule
  ],
  exports:[ ... component]
})
export class SharedModule { }
