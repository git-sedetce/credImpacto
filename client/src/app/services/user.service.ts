import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  CriptografarMD5(value: string | undefined): string | undefined {
    return Md5.hashStr(value!).toString();
  }
}
