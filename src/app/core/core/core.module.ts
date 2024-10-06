import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFireModule} from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment.prod';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    AngularFireStorageModule,
    AngularFireAuthModule,
  ]
})
export class CoreModule { }
