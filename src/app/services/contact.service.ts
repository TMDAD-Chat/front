import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Constants } from '../util/constants';
import { ContactInterface } from '../util/dto';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  getContacts(): Observable<ContactInterface[]> {
    return of([
      {
        name: 'Contact',
        email: 'contact@email.com',
        photo: Constants.defaultImage,
        status: 'offline',
      },
      {
        name: 'Contact2',
        email: 'contact@email.com',
        photo: Constants.defaultImage,
        status: 'offline',
      },
      {
        name: 'Contact3',
        email: 'contact@email.com',
        photo: Constants.defaultImage,
        status: 'offline',
      },
    ]);
  }
}
