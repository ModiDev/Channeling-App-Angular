import { LocalStorageService } from "./../../../core/services/local-storage/local-storage.service";
import { DrawerService } from "./../../../core/services/drawer/drawer.service";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { Drawer } from "src/app/core/commons/models/Drawer";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string = "";
  loading: boolean = false;

  drawers: Drawer[] = [];
  selectedDrawer?: Drawer;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private storage: LocalStorageService,
    private drawerService: DrawerService
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      drawerId: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.drawerService.getDrawerCollection().subscribe((actions) => {
      this.drawers = actions.map((a) => ({
        ...a.payload.doc.data(),
        id: a.payload.doc.id,
      }));
      const did = this.storage.getCurrentDrawerId();
      if (did){
        const [dd] = this.drawers.filter((d) => d.id === did);
        console.log("xxxxxxxxxx",dd.id)
        this.selectedDrawer = dd;
        this.loginForm.controls['drawerId'].setValue(dd.id);
      }
        
    });
  }

  onSubmit() {
    let drawerId = this.loginForm.get("drawerId")?.value;
    this.loading = true;
    this.auth
      .signIn(
        this.loginForm.get("username")?.value,
        this.loginForm.get("password")?.value
      )
      .then((user) => {
        if (user.user?.uid)
          this.auth
            .updateUserLoginState({
              isLogin: true,
              uid: user.user?.uid,
              drawerId: drawerId,
            })
            .subscribe(
              () => {
                const [drawer] = this.drawers.filter((d) => d.id === drawerId);
                this.storage.saveCurrentDrawer(drawer);
                this.loading = false;
              },
              () => {
                this.auth.signOut();
              }
            );
      })
      .catch((error) => {
        this.loading = false;
        switch (error.code) {
          case "auth/invalid-email": {
            this.error =
              "Password or the Email entered was invalid please enter a valid Password and Email";
            break;
          }
          case "auth/wrong-password": {
            this.error =
              "Password or the Email entered was invalid please enter a valid Password and Email";
            break;
          }
          case "auth/user-not-found": {
            this.error = "This account or user cannot be found";
            break;
          }
          default: {
            this.error = "Unexpected error occurred";
            break;
          }
        }
      });
  }
}
