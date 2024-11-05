import { Component, inject, OnInit } from '@angular/core';
import { ContactServiceService } from '../services/contact-service.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Contact } from '../model/contact.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export default class ContactListComponent implements OnInit{
  private contactService = inject(ContactServiceService);

  contacts: Contact[] = [];
  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(){
    this.contactService.list()
      .subscribe((contacts) => {
        this.contacts = contacts;
      });
  }
  deleteContact(contact: Contact): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactService.delete(contact.idContacto).subscribe(() => {
          this.loadAll();
          Swal.fire('Eliminado!', 'El contacto ha sido eliminado.', 'success');
        });
      }
    });
  }
}
