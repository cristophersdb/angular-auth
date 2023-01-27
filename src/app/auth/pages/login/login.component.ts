import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  reactiveForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    console.log(this.reactiveForm.value);
    //extraemos el email y el pass
    const { email, password } = this.reactiveForm.value;

    //usamos el servicio
    this.authService.login(email, password).subscribe((resp) => {
      console.log(resp);
      resp === true
        ? this.router.navigateByUrl('/dashboard')
        : Swal.fire('Error', resp, 'error');
    });

    /* this.router.navigateByUrl('/dashboard'); */
  }
}
