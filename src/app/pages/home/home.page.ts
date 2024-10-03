import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastController: ToastController, private loadingService: LoadingService) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', [Validators.required, Validators.min(1)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      image: ['', Validators.required]
    });
  }

  async presentToast(message: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      icon: 'globe',
      color: 'success',
      position: 'top'
    });
    toast.present();
  }

  async onSubmit(){
    await this.loadingService.present('Registrando...');

    if (this.myForm.valid){
      console.log('Formulario válido', this.myForm.value);
    setTimeout(async () => {
      await this.loadingService.dismiss();
      this.presentToast('Formulario enviado correctamente.');
    }, 2000);
    } else {
      if (this.myForm.get('name')?.invalid){
        this.presentToast('El campo nombre es requerido.');
      }
      if (this.myForm.get('lastName')?.invalid){
        this.presentToast('El campo apellido es requerido.');
      }
      if (this.myForm.get('email')?.invalid){
        this.presentToast('El campo email es requerido y debe ser un correo valido.');
      }
      if (this.myForm.get('password')?.invalid){
        this.presentToast('El campo contraseña es requerido y minimo 6 caracteres.');
      }
      if (this.myForm.get('age')?.invalid){
        this.presentToast('El campo edad es requerido y debe ser mayor a 1.');
      }
      if (this.myForm.get('phone')?.invalid){
        this.presentToast('El campo numero es requerido y solo permite números.');
      }
      if (this.myForm.get('image')?.invalid){
        this.presentToast('El campo imagen es requerido.');
      }
      await this.loadingService.dismiss();
    }
  }
}
