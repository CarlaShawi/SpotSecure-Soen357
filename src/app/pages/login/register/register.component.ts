import {
  Authority,
  UserDTO,
} from './../../../models/users';
import { Component } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AuthService,
  MyErrorStateMatcher,
} from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  hide = true;
  Uploading = false;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private database: Database,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      ConfirmEmail: ['', [Validators.required, Validators.email]],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      Authority: [Authority.Public, [Validators.required]],
      ID: [''],
    });
  }

  passwordConfirmationValidator(form: FormGroup) {
    const password = form.get('Password')!.value;
    const confirm = form.get('ConfirmPassword')!.value;

    if (password !== confirm) {
      form.controls['ConfirmPassword'].setErrors({ incorrect: true });
    } else {
      form.controls['ConfirmPassword'].setErrors(null);
    }
    return password === confirm ? null : 'The passwords are not the same';
  }

  emailConfirmationValidator(form: FormGroup) {
    const email = form.get('Email')!.value;
    const confirm = form.get('ConfirmEmail')!.value;

    if (email !== confirm) {
      form.controls['ConfirmEmail'].setErrors({ incorrect: true });
    } else {
      form.controls['ConfirmEmail'].setErrors(null);
    }
    return email === confirm ? null : 'The emails are not the same';
  }

  async onSubmit() {
    // stop the process here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.Uploading = true;
    let authority = this.registerForm.value.Authority;
    let path = '';
    if (authority == Authority.Public) {
      path = 'public users/';
    }
    let rid: string = '';
    rid = await this.authService.SignUp(
      this.registerForm.value.Email,
      this.registerForm.value.Password,
      authority
    );
    if (rid == '') {
      this.Uploading = false;
      return;
    }
    await this.registerUser(this.registerForm.value, rid, path);
    this.Uploading = false;
  }

  // fix code duplication in user service later
  async registerUser(value: any, id: string, path: string) {
    // TODO:You should send the data as an OBJECT THAT AS AN INTERFACE not one value one by one
    //I put an example below, also if you check the file where the user interface comes from you can fill
    // it up with the appropriate interfaces
    //you should add all the fields that are not entered by the user as fields that do not need validators in the
    //this.registerForm and fill them up before this function is called

    if (path == 'public users/') {
      const user: UserDTO = {
        FirstName: value.FirstName,
        LastName: value.LastName,
        ID: id,
        Authority: Authority.Public,
        Email: value.Email,
        PhoneNumber: '',
        UserName: value.FirstName + ' ' + value.LastName,
        ProfilePicture: '',
      };

      set(ref(this.database, path + id), user);
    }
  }
}
