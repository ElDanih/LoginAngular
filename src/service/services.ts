import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioDto } from './../app/models/usuario.dto';
import { Usuario2Dto } from './../app/models/usuario2.dto';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class Services {

    constructor(
        private httpCliente: HttpClient
        ) {}

    getUser(numeroDocumento: String) {
        return this.httpCliente.get<UsuarioDto>(`http://localhost:8080/Chontaduro/resources/final/request/${numeroDocumento}`).pipe(
            catchError(this.handleError));
    }

    getAllUsers() {
        return this.httpCliente.get<UsuarioDto[]>(`http://localhost:8080/Chontaduro/resources/final/requestAll`);
    }

    createUser(user: Usuario2Dto){
        return this.httpCliente.post(`http://localhost:8080/Chontaduro/resources/final/save`, user).pipe(
            catchError(this.handleError));
    }

    deleteUser(numeroDocumento: String){
        return this.httpCliente.get(`http://localhost:8080/Chontaduro/resources/final/delete/${numeroDocumento}`).pipe(
            catchError(this.handleError));
    }

    updateUser(user: Usuario2Dto){
        return this.httpCliente.post(`http://localhost:8080/Chontaduro/resources/final/update`, user).pipe(
            catchError(this.handleError));
    }


    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
          // Client-side errors
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side errors
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
      }




}




