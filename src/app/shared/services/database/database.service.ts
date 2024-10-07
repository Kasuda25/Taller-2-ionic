import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { switchMap } from 'rxjs/operators';



export interface Task {
  id?: string;
  title: string;
  description: string;
  date: any;
  userId: string;
  done: boolean;
}


@Injectable({
  providedIn: 'root'
})


export class DatabaseService {

  private TasksTable = 'tasks';


  constructor(public fireStore: AngularFirestore, 
    public authsrv: AuthService
  ) { }

  public createTaskTable(task: Task): Promise<void> {
    return this.authsrv.isAuth().then((isAuth) => {
      if (isAuth) {
        const id = this.fireStore.createId();  // Generar un ID único
        return this.fireStore.collection(this.TasksTable).doc(id).set({ ...task, id });
      } else {
        return Promise.reject('Usuario no autenticado');
      }
    });
  }

  public GetTaskTable(userId: string): Observable<Task[]> {
    return from(this.authsrv.isAuth()).pipe(
      switchMap((isAuth) => {
        if (isAuth) {
          return this.fireStore.collection<Task>(this.TasksTable, ref =>
            ref.where('userId', '==', userId)).valueChanges();
        } else {
          throw new Error('Usuario no autenticado');
        }
      })
    );
  }

  public updateTaskTable(taskId: string, task: Task): Promise<void> {
    return this.authsrv.isAuth().then((isAuth) => {
      if (isAuth) {
        return this.fireStore.collection(this.TasksTable).doc(taskId).update(task);
      } else {
        return Promise.reject('Usuario no autenticado');
      }
    });
  }

  public deleteTaskTable(taskId: string): Promise<void> {
    return this.authsrv.isAuth().then((isAuth) => {
      if (isAuth) {
        return this.fireStore.collection(this.TasksTable).doc(taskId).delete();
      } else {
        return Promise.reject('Usuario no autenticado');
      }
    });
  }


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
