import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ContactServiceService } from '../services/contact-service.service';
import { Contact } from '../model/contact.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export default class ContactFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private routeEdit = inject(ActivatedRoute);
  private contactService = inject(ContactServiceService);

  form?: FormGroup;
  contact?: Contact;

  ngOnInit(): void {
    const id = this.routeEdit.snapshot.paramMap.get('id');
    if (id) {
      this.contactService.getPorId(parseInt(id)).subscribe((contact) => {
        this.contact = contact;
        this.form = this.fb.group({
          name: [contact.name, [Validators.required]],
          email: [contact.email, [Validators.required, Validators.email]],
        });
      });
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
      });
    }
  }

  save() {
    if (this.form?.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const contactForm = this.form!.value;
    // Mensaje de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas guardar los cambios?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.contact) {
          this.contactService
            .update(this.contact.idContacto, contactForm)
            .subscribe(() => {
              // Mensaje de éxito
              Swal.fire(
                'Guardado!',
                'El contacto ha sido actualizado.',
                'success'
              ).then(() => {
                this.router.navigate(['/']);
              });
            });
        } else {
          this.contactService.create(contactForm).subscribe(() => {
            // Mensaje de éxito
            Swal.fire('Creado!', 'El contacto ha sido creado.', 'success').then(
              () => {
                this.router.navigate(['/']);
              }
            );
          });
        }
      }
    });
  }
}
