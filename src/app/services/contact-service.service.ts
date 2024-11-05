import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Contact } from '../model/contact.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactServiceService {
  private apiUrl = 'http://localhost:8080/api/contact/';
  private http = inject(HttpClient);

  list() {
    return this.http.get<Contact[]>(this.apiUrl + 'list');
  }


  getPorId(id: number) {
    const url = `${this.apiUrl}${id}`;
    return this.http.get<Contact>(url);
  }

  create(contact: Contact) {
    const url = `${this.apiUrl}save`; // Concatenar /save a la URL base
    return this.http.post<Contact>(url, contact);
  }

  delete(id: number) {
    const url = `${this.apiUrl}${id}`;
    return this.http.delete<void>(url);
  }

  update(id: number, contact: Contact) {
    const url = `${this.apiUrl}${id}`;
    return this.http.put<Contact>(url, contact);
  }
}
