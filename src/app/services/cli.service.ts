import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cli } from '../models/cli';

@Injectable({
  providedIn: 'root'
})
export class CliService {

  url = 'http://localhost:1337/clis'; // api rest

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os Clis
  getClis(): Observable<Cli[]> {
    return this.httpClient.get<Cli[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um cli pelo id
  getCliById(id: String): Observable<Cli> {
    return this.httpClient.get<Cli>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um cli
  saveCli(cli: Cli): Observable<Cli> {
    return this.httpClient.post<Cli>(this.url, JSON.stringify(cli), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um cli
  updateCli(Cli: Cli): Observable<Cli> {
    return this.httpClient.put<Cli>(this.url + '/' + Cli.id, JSON.stringify(Cli), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um cli
  deleteCli(cli: Cli) {
    return this.httpClient.delete<Cli>(this.url + '/' + cli.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
