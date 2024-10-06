import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly fbAuth: AngularFireAuth) { }

  public register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.fbAuth.createUserWithEmailAndPassword(email, password)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
  public login(email: string, password: string){
    return new Promise ((resolve, reject) => {
      this.fbAuth.signInWithEmailAndPassword(email,password).then((res)=> resolve(res))
      .catch((err)=> reject(err));
    });
  }

  public logOut(){
    return new Promise((resolve, reject) =>{
      this.fbAuth.signOut()
      .then((res)=> resolve(res))
      .catch((err)=> reject(err));
    });
  }

}
