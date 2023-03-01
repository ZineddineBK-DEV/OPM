import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BackendService } from "../../../services/backend.service";
import Observer from "../../../services/observer";
import { Router } from "@angular/router";
import { SIGNUP_END_POINT } from "../../../services/endpoints";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {

  constructor(
    private backendService: BackendService,
    public router: Router
  ) {
  }

  ngOnInit() {}

  signup(form: NgForm) {
    const payload = { ...form.value };
    delete payload["pass2"];
    this.backendService
      .post(SIGNUP_END_POINT, payload)
      .subscribe(new Observer(this.router,"/signin",false,true).OBSERVER_POST());
  }

}
