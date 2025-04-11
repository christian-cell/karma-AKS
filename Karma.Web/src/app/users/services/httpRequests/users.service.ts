import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from 'src/app/models';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(

    private http:                                           HttpClient
  ) { }

  getUsers():Observable <UserResponse[]> {

    return this.http.get<UserResponse[]>(`${environment.api.baseUrl}User`);
  }
}
