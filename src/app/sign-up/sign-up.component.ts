import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioDto } from '../models/usuario.dto';
import { Usuario2Dto } from '../models/usuario2.dto';
import { Services } from './../../service/services';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit { 

  constructor(
    private router: Router,
    private services: Services,
  ) {}

  
  ngOnInit(): void {}

  // user: UsuarioDto = {
  //   "tipodocumento": "",
  //   "numerodocumento": "",
  //   "primernombre": "",
  //   "segundonombre": "",
  //   "primerapellido": "",
  //   "segundoapellido": "",
  //   "municipio": "",
  //   "direccion": "",
  //   "email": "",
  //   "password": ""
  // }

  user: Usuario2Dto = {
    tipoDocumento: "",
    numeroDocumento: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    municipio: "",
    direccion: "",
    email: "",
    password: ""
  }

  
  tipoDocumento: string = "";
  numeroDocumento: string = "";
  primerNombre: string = "";
  segundoNombre: string = "";
  primerApellido: string = "";
  segundoApellido: string = "";
  municipio: string = "";
  direccion: string = "";
  email: string = "";
  password: string = "";
  passwordConfirm: string = "";
  

  crearUsuario(){

    if(this.tipoDocumento==="" || 
    this.numeroDocumento === "" ||
    this.primerNombre === "" ||
    this.primerApellido ==="" ||
    this.municipio === "" ||
    this.email === "" ||
    this.password === "" ||
    this.passwordConfirm === ""){

      Swal.fire('Oops...', 'Ningún campo puede ir vacio', 'error');

    }else{
      if(this.password != this.passwordConfirm){
        Swal.fire('Oops...', 'Las contraseñas deben ser iguales', 'warning');
      }else{

        const newUser: Usuario2Dto = {
          "tipoDocumento": this.tipoDocumento,
          "numeroDocumento": this.numeroDocumento,
          "primerNombre": this.primerNombre,
          "segundoNombre": this.segundoNombre,
          "primerApellido": this.primerApellido,
          "segundoApellido": this.segundoApellido,
          "municipio": this.municipio,
          "direccion": this.direccion,
          "email": this.email,
          "password": this.password
        } 
        
        console.log(newUser);
        
        this.services.createUser(newUser)
        .subscribe(users => {
          console.log(users); 
          Swal.fire('¡Bien!', 'Registro ingresado correctamente', 'success');
          this.router.navigate(['login']);         
        });  
        
        
        
      }       
    }    
  }

}
