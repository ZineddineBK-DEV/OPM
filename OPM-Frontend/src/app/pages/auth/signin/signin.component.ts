import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import {
  SIGNIN_END_POINT,
} from "../../../services/endpoints";
import { BackendService } from "../../../services/backend.service";
import Observer from "../../../services/observer";
import { SharedService } from "../../../services/shared.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  constructor(
    private backendService: BackendService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit() {}

  login(form: NgForm) {
    const payload = { ...form.value };
    this.backendService.post(SIGNIN_END_POINT, payload).subscribe(
      new Observer(this.router, "/app/dashboard", false).OBSERVER_SIGNIN(
        (response: any) => {
          const { accessToken, refreshToken } = response;
          this.sharedService.setItem("accessToken", accessToken);
          this.sharedService.setItem("refreshToken", refreshToken);
          // }
        }
      )
    );
  }
}
