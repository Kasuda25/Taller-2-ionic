import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly fbAuth: AngularFireAuth) { }

  public async register(email: string, password: string): Promise<any> {
    try {
      const res = await this.fbAuth.createUserWithEmailAndPassword(email, password);
      if (res.user) {
        return res.user.uid;
      }
    } catch (err) {
      console.error(err);
    }
  }

  public login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.fbAuth.signInWithEmailAndPassword(email, password).then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  public logOut() {
    return new Promise((resolve, reject) => {
      this.fbAuth.signOut()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  public isAuth() {
    return new Promise((resolve, reject) => {
      this.fbAuth.onAuthStateChanged(user => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  
}
