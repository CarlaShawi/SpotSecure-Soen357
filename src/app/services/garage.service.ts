import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GarageService {

  constructor(private db: AngularFireDatabase) { }

  getGarages(): Observable<any> {
    return this.db.object('garages').valueChanges();
  }
}
