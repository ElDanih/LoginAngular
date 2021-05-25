import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioDto } from '../models/usuario.dto';
import { Services } from './../../service/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private services: Services,
  ) {}
  ngOnInit(): void { }

  numeroDocumento: String = "";
  password: String = ""; 

  user: UsuarioDto = {
    tipodocumento: "",
    numerodocumento: "",
    primernombre: "",
    segundonombre: "",
    primerapellido: "",
    segundoapellido: "",
    municipio: "",
    direccion: "",
    email: "",
    password: ""
  }


  traerUsuario() {
    if(this.numeroDocumento === '' || this.password ===''){
      Swal.fire('Oops...', 'Usuario y/o contraseña vacios', 'error');
    }else{
      this.services.getUser(this.numeroDocumento)
      .subscribe(users => {
        console.log(users);
        this.user = users; 
        this.user.password ? this.validarLogin(this.user.password) : Swal.fire('Oops...', 'El usuario no existe', 'warning');;
      });
    }
  }


  validarLogin(pass: String): void {

    if(this.password === pass){     
      Swal.fire('¡Genial!', 'Usuario y password correctos', 'success');
      this.router.navigate(['home']);

    }else{
      Swal.fire('Oops...', 'Password incorrecto', 'warning');
    }

  }

}
