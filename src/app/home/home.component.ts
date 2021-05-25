import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioDto } from '../models/usuario.dto';
import { Usuario2Dto } from '../models/usuario2.dto';
import { Services } from './../../service/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public documentoHijo: string="Sin datos";
  constructor(
    private router: Router,
    private services: Services,
  ) {}

  ngOnInit(): void {
    this.traerUsuarios();
  }

  users: UsuarioDto[] = [];
  datos: any[] = [];
  form: boolean = false;
  index: number = -1;

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


  user2: Usuario2Dto = {
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

  traerUsuarios() {
      this.services.getAllUsers()
      .subscribe((response:  any[]) => {
        console.log(response);
        this.datos = response;
        console.log(this.datos[0].primernombre);        
      },
      error =>  console.log(<any>error));
  }

  actualizarUsuario(usuario: String, form:boolean){
    Swal.fire({
      title: '¿Quieres editar este usuario?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '!Si, quiero editar este usuario!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.form = form;
        this.traerUsuario(usuario)
      }
    })    
  }


  eliminarUsuario(usuario: String, index:number){

    Swal.fire({
      title: '¿Estas seguro?',
      text: "Este cambio no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '!Si, Borra este Usuario!'
    }).then((result) => {
      if (result.isConfirmed) {
      this.services.deleteUser(usuario)
      .subscribe((response:  any) => {
        console.log(response);
        this.datos.splice(index,1); 
      }, error =>  console.log(<any>error));
        Swal.fire(
          'Borrado',
          'El usuario ha sido borrado',
          'success'
        )
      }
    })
  }

  traerUsuario(usuario: String):boolean {
      this.services.getUser(usuario)
      .subscribe(users => {
        console.log(users);
        this.user = users;
      });

      return true;
  }

  ejecutarUpdate(){

      if(this.password != this.passwordConfirm){
        Swal.fire('Oops...', 'Las contraseñas deben ser iguales', 'warning');
      }else{

        //var test = document.getElementById("tipodocumento");

        const updateUser: Usuario2Dto = {
          "tipoDocumento": ((document.getElementById("tipodocumento") as HTMLInputElement).value),
          "numeroDocumento": ((document.getElementById("numerodocumento") as HTMLInputElement).value),
          "primerNombre": ((document.getElementById("primernombre") as HTMLInputElement).value),
          "segundoNombre": ((document.getElementById("segundonombre") as HTMLInputElement).value),
          "primerApellido": ((document.getElementById("primerapellido") as HTMLInputElement).value),
          "segundoApellido": ((document.getElementById("segundoapellido") as HTMLInputElement).value),
          "municipio": ((document.getElementById("municipio") as HTMLInputElement).value),
          "direccion": ((document.getElementById("direccion") as HTMLInputElement).value),
          "email": ((document.getElementById("email") as HTMLInputElement).value),
          "password": ((document.getElementById("password") as HTMLInputElement).value)
        }  
        
        console.log(updateUser);
             
        
        this.services.updateUser(updateUser)
        .subscribe(users => {
          console.log(users); 
          Swal.fire('¡Bien!', 'Usuario actualizado', 'success');
          this.form = false;
          this.traerUsuarios();        
        }); 
      } 
  }

  cancelar(){
    this.form = false;

    this.tipoDocumento = "";
    this.numeroDocumento = "";
    this.primerNombre = "";
    this.segundoNombre = "";
    this.primerApellido = "";
    this.segundoApellido = "";
    this.municipio = "";
    this.direccion = "";
    this.email = "";
    this.password = "";
    this.passwordConfirm = "";
  }


}
