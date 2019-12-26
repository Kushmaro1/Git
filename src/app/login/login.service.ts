import { Injectable } from '@angular/core';
import {http,RestURL} from '../shared/constants';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) {}
  getLoggedIn(payload): Observable < any > {
    return this.httpClient.post<any>(http+RestURL +'api/login',payload);
  }
}
