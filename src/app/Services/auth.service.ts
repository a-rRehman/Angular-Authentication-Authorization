import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthResponse } from "../Model/AuthResponse";
import { catchError, throwError } from "rxjs";

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
    return this.http
      .post<AuthResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUTQ8b0XNZ1L5sXQuGL06FA2JZiAaWPS8",
        data
      )
      .pipe(
        catchError((err) => {
          let errorMessage = "An unknown error has occured";
          if (!err.error || !err.error.error) {
            return throwError(() => errorMessage);
          }
          switch (err.error.error.message) {
            case "EMAIL_EXISTS":
              errorMessage = "This email already exists";
              break;
            case "INVALID_LOGIN_CREDENTIALS":
              errorMessage = "INVALID_LOGIN_CREDENTIALS";
              break;
          }
          return throwError(() => errorMessage);
        })
      );
  }

  login(email, password) {
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.http
      .post<AuthResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUTQ8b0XNZ1L5sXQuGL06FA2JZiAaWPS8",
        data
      )
      .pipe(
        catchError((err) => {
          let errorMessage = "An unknown error has occured";
          if (!err.error || !err.error.error) {
            return throwError(() => errorMessage);
          }
          switch (err.error.error.message) {
            case "EMAIL_EXISTS":
              errorMessage = "This email already exists";
              break;
            case "INVALID_LOGIN_CREDENTIALS":
              errorMessage = "INVALID_LOGIN_CREDENTIALS";
              break;
          }
          return throwError(() => errorMessage);
        })
      );
  }
}
