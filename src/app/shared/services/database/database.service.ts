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
  providedIn: 'root',
})
export class DatabaseService {
  private TasksTable = 'tasks';

  constructor(
    public fireStore: AngularFirestore,
    public authsrv: AuthService
  ) {}

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

  public async createTask(task: any): Promise<void> {
    const isAuth = await this.authsrv.isAuth();
    if (isAuth) {
      const id = this.fireStore.createId();
      return this.fireStore
        .collection(this.TasksTable)
        .doc(id)
        .set({ ...task, id });
    } else {
      return Promise.reject('User not authenticated.');
    }
  }

  public getuserTasks(userId: string): Observable<Task[]> {
    return from(this.authsrv.isAuth()).pipe(
      switchMap((isAuth) => {
        if (isAuth) {
          return this.fireStore
            .collection<Task>(this.TasksTable, (ref) =>
              ref.where('userId', '==', userId)
            )
            .valueChanges();
        } else {
          throw new Error('User not authenticated.');
        }
      })
    );
  }

  public getTaskById(taskId: string): Observable<Task | undefined> {
    return this.fireStore
      .collection<Task>(this.TasksTable)
      .doc(taskId)
      .valueChanges();
  }
  

  public async updateTask(taskId: string, task: Task): Promise<void> {
    const isAuth = await this.authsrv.isAuth();
    if (isAuth) {
      return this.fireStore
        .collection(this.TasksTable)
        .doc(taskId)
        .update(task);
    } else {
      return Promise.reject('User not authenticated.');
    }
  }

  public async deleteTask(taskId: string): Promise<void> {
    const isAuth = await this.authsrv.isAuth();
    if (isAuth) {
      return this.fireStore.collection(this.TasksTable).doc(taskId).delete();
    } else {
      return Promise.reject('User not authenticated.');
    }
  }

}
