import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  isLoginMode: boolean = true;
  onswitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onFormSubmitted(form: NgForm) {
    console.log(form.value);
    form.reset();
  }
}
