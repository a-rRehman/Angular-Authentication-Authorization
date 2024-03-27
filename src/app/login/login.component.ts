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
  onswitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onFormSubmitted(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLoginMode) {
      return;
    } else {
      this.isLoading = true;
      this.authService.signup(email, password).subscribe({
        next: (response) => {
          console.log("The Response is :", response);
          this.isLoading = false;
        },
        error: (error) => {
          console.log("The Error is ", error);
          this.isLoading = false;
        },
      });
    }
    console.log(form.value);
    form.reset();
  }
}
