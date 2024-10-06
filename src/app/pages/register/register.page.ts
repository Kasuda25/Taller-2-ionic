import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public image!: FormControl;
  public name!: FormControl;
  public lastName!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public registerForm!: FormGroup;
  constructor(private readonly authSrv: AuthService, private readonly loadingSrv: LoadingService,
    private readonly nvctrl:NavController
  ) {
    this.initForm();
  }

  ngOnInit() {
  }

  public async doRegister() {
    try {
      await this.loadingSrv.show();
      console.log(this.registerForm.value);
      const { email, password } = this.registerForm.value;
      const response = await this.authSrv.register(email, password);
      console.log(response);
      await this.loadingSrv.dismiss();
      this.nvctrl.navigateForward("");
    } catch (error) {
      await this.loadingSrv.dismiss();
      console.error(error);
    }
  }
  
  private initForm() {
    this.image = new FormControl();
    this.name = new FormControl([Validators.required]);
    this.lastName = new FormControl([Validators.required]);
    this.email = new FormControl([Validators.required, Validators.email]);
    this.password = new FormControl([Validators.required]);
    this.registerForm = new FormGroup({
      image: this.image,
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    });
  }

}
