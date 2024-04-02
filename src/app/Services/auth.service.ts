import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthResponse } from "../Model/AuthResponse";
import { Subject, catchError, tap, throwError } from "rxjs";
import { User } from "../Model/User";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  user = new Subject<User>();

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
        }),
        tap((res) => {
          this.handleCreateUser(res);
        })
      );
  }

  private handleCreateUser(res) {
    const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
    const expiresIn = new Date(expiresInTs);
    const user = new User(res.email, res.localId, res.idToken, expiresIn);
    this.user.next(user);
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
        catchError(this.handleError),
        tap((res) => {
          this.handleCreateUser(res);
        })
      );
  }

  private handleError(err) {
    let errorMessage = "An unknown error has occured";
    if (!err.error || !err.error.error) {
      return throwError(() => errorMessage);
    }
    switch (err.error.error.message) {
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email doesnot exists";
        break;
      case "INVALID_LOGIN_CREDENTIALS":
        errorMessage = "INVALID_LOGIN_CREDENTIALS";
        break;
    }
    return throwError(() => errorMessage);
  }
}
