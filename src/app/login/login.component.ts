import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../Services/auth.service";
import { inject } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);
  isLoginMode: boolean = true;
  isLoading: Boolean = false;
  errorMessage: string | null = null;
  onswitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onFormSubmitted(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLoginMode) {
      this.isLoading = true;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log("The Response is :", response);
          this.isLoading = false;
        },
        error: (errMsg) => {
          console.log("The Error is ", errMsg);
          this.isLoading = false;
          this.errorMessage = errMsg;
          this.hideSnackbar();
        },
      });
    } else {
      this.isLoading = true;
      this.authService.signup(email, password).subscribe({
        next: (response) => {
          console.log("The Response is :", response);
          this.isLoading = false;
        },
        error: (errMsg) => {
          console.log("The Error is ", errMsg);
          this.isLoading = false;
          this.errorMessage = errMsg;
          this.hideSnackbar();
        },
      });
    }
    console.log(form.value);
    form.reset();
  }
  hideSnackbar() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }
}
