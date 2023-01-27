import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  reactiveForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  register() {
    console.log(this.reactiveForm.value);
    const { name, email, password } = this.reactiveForm.value;
    this.authService.register(name, email, password).subscribe((resp) => {
      console.log(resp);
      resp === true
        ? this.router.navigateByUrl('/dashboard')
        : Swal.fire('Error', resp, 'error');
    });
  }
}
