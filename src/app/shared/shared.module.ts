import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/auth/auth.service';
import { LoadingService } from './controllers/loading/loading.service';
import { ToastService } from './controllers/toastService/toast.service';
import { DatabaseService } from './services/database/database.service';

const COMPONENTS = [
  InputComponent,
  ButtonComponent,
  AvatarComponent,
];

const MODULES = [
  CommonModule,
  FormsModule,
  IonicModule,
  ReactiveFormsModule
];

const PROVIDERS = [
  StorageService,
  AuthService,
  DatabaseService,
  DatePipe
];

const CONTROLLERS = [
  LoadingService,
  ToastService
];

@NgModule({
  declarations: [ ... COMPONENTS],
  imports: [
    ...MODULES,
  ],
  providers:[ ... PROVIDERS, ...CONTROLLERS],
  exports:[ ... COMPONENTS, ...MODULES]
})
export class SharedModule { }
