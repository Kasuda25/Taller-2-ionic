import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email!: FormControl;
  public password!: FormControl;
  public loginForm!: FormGroup;

  constructor(
    private readonly authServ: AuthService,
    private readonly nvctrl: NavController,
    private readonly loadsrv: LoadingService
  ) {
    this.initForm();
  }

  ngOnInit() {
  }

  public async doLogin() {
    try{
      console.log(this.loginForm.value);
      await this.loadsrv.show();
      const {email, password } = this.loginForm.value;
      await this.authServ.login(email, password);
      this.nvctrl.navigateForward("home");
      await this.loadsrv.dismiss();

    }catch(error){

      console.error(error);
      await this.loadsrv.dismiss();


    }

  }

  private initForm() {
    this.email = new FormControl([Validators.required, Validators.email]);
    this.password = new FormControl([Validators.required]);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

}
