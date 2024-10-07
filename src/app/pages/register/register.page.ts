import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
import { ToastService } from 'src/app/shared/controllers/toastService/toast.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { DatabaseService } from 'src/app/shared/services/database/database.service';
import { tap } from 'rxjs/operators';

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
  public age!: FormControl;
  public phone!: FormControl;
  public registerForm!: FormGroup;
  public id: string = "";
  user: any;

  constructor(private readonly authSrv: AuthService, private readonly dbSrv: DatabaseService, private readonly loadingSrv: LoadingService,
    private readonly nvctrl: NavController, private readonly toastSrv: ToastService, private readonly route: ActivatedRoute) {
    this.initForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.fillFormForUpdate();
      }
    });
  }

  public async doRegister() {
    try {
      await this.loadingSrv.show();
      const { email, password, name, lastName, age, phone, image } = this.registerForm.value;
      const uid = await this.authSrv.register(email, password);
      const userData = {
        name: name,
        lastName: lastName,
        email: email,
        age: age,
        phone: phone,
        image: image,
      };
      await this.dbSrv.addUser(uid, userData);
      await this.loadingSrv.dismiss();
      this.nvctrl.navigateForward("");
      await this.toastSrv.presentToast("Registrado", "success", "checkmark");
    } catch (error) {
      await this.loadingSrv.dismiss();
      await this.toastSrv.presentToast("Error al registrar usuario", "danger", "close");
      console.error(error);
    }
  }

  public async doUpdate() {
    try {
      await this.loadingSrv.show();
  
      const { name, lastName, age, phone, image } = this.registerForm.value;
  
      const updatedUserData = {
        name: name,
        lastName: lastName,
        age: age,
        phone: phone,
        image: image,
      };
  
      await this.dbSrv.updateUser(this.id, updatedUserData);
  
      await this.loadingSrv.dismiss();
  
      this.nvctrl.navigateForward("/profile");
    } catch (error) {
      await this.loadingSrv.dismiss();
      await this.toastSrv.presentToast("Error al actualizar usuario", "danger", "close");
      console.error(error);
    }
  }
  

  private async fillFormForUpdate() {
    await this.loadingSrv.show();
    this.dbSrv.getUserByUid(this.id)
      .subscribe(
        async data => {

          this.user = data;

          this.registerForm.removeControl("email");
          this.registerForm.removeControl("password");

          this.image.setValue(this.user.image);
          this.name.setValue(this.user.name);
          this.lastName.setValue(this.user.lastName);
          this.email.setValue(this.user.email);
          this.password.setValue("******");
          this.age.setValue(this.user.age);
          this.phone.setValue(this.user.phone);

        },
        error => {
          console.error(error);
        }
      );
      await this.loadingSrv.dismiss();
  }

  private initForm() {
    this.image = new FormControl('');
    this.name = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.age = new FormControl('', [Validators.required, Validators.min(18)]);
    this.phone = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]);

    this.registerForm = new FormGroup({
      image: this.image,
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      age: this.age,
      phone: this.phone
    });
  }
}

