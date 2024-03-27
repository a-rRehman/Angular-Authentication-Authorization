import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthResponse } from "../Model/AuthResponse";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  http: HttpClient = inject(HttpClient);

  signup(email, password) {
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.http.post<AuthResponse>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUTQ8b0XNZ1L5sXQuGL06FA2JZiAaWPS8",
      data
    );
  }
}
