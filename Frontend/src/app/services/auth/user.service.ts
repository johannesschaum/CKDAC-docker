import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SingleUserResponse } from '~/app/utils/responses/user-response';
import { environment } from '~/environments/environment';
import { IUser } from '~/app/models/user-model';

const host = environment.backendBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public async getUser(userId: string) {
    try {
      let response = await this.http.get<SingleUserResponse>(`${host}/users/${userId}`).toPromise();
      return response.result.user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async updateUser(userData: IUser) {
    try {
      let response = await this.http.put(`${host}/users/${userData.id}`, userData).toPromise();
      return true;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

}
