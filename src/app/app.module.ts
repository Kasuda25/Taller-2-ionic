import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core/core.module';
import { ToastComponent } from './shared/components/toast/toast.component';

@NgModule({
  declarations: [AppComponent, ToastComponent],
  imports: [CoreModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
