import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public fireStore: AngularFirestore) { }

  public addUser(uid: string, userData: any) {
    return this.fireStore.collection('users').doc(uid).set(userData);
  }

  public getUserByUid(uid: string): Observable<any> {
    return this.fireStore.collection('users').doc(uid).valueChanges();
  }

  public async updateUser(uid: string, updatedUserData: any): Promise<void> {
    try {
      await this.fireStore.collection('users').doc(uid).update(updatedUserData);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
