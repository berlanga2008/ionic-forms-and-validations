import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PasswordValidator } from '../validators/password.validator';
import { CountryPhone } from './country-phone.model';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;


  countries: Array<CountryPhone>;
  genders: Array<string>;

  validation_messages = {
    'username': [
      { type: 'required', message: 'Nombre es obligatorio.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'name': [
      { type: 'required', message: 'Nombre es obligatorio.' }
    ],
    'lastname': [
      { type: 'required', message: 'Apellido es obligatorio.' }
    ],
    'email': [
      { type: 'required', message: 'Email es obligatorio.' },
      { type: 'pattern', message: 'Por favor, inserte un mail válido.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
    'password': [
      { type: 'required', message: 'Password es obligatorio.' },
      { type: 'minlength', message: 'Password debe tener al menos 5 caracteres' },
      { type: 'pattern', message: 'El password debe tener al menos una mayúscula, una minúscula y un número.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
    'terms': [
      { type: 'pattern', message: 'Debes de aceptar los terminos y condiciones.' }
    ],
  };

  ngOnInit() {
    //  We just use a few random countries, however, you can use the countries you need by just adding them to this list.
    // also you can use a library to get all the countries from the world.



    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]))
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });




    this.validations_form = this.formBuilder.group({
     /* username: new FormControl('', Validators.compose([
       // UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),*/
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      matching_passwords: this.matching_passwords_group,
      terms: new FormControl(true, Validators.pattern('true'))
    });
  }

  onSubmit(values) {
    console.log(values);
    let laUrl: string;
    laUrl = 'https://vivaelmusculo.com/login?create_account=1&id_customer=&firstname=' + values.name +
    '&lastname=' + values.lastname + '&email=' + values.lastname + '&password= ' + values.matching_passwords.password +
    '&newsletter=1&customer_privacy=1&submitCreate=1';

    this.http.get(laUrl).subscribe((response) => {
      console.log(response);
    });
    this.router.navigate(['/user']);
  }

 }
