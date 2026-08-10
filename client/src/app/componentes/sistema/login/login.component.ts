import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginUser } from '../../../model/login-user.model';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { cpfOrEmailValidator } from './validators/cpf-email.validators';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  @ViewChild("formLogin") formLogin!: NgForm;
  @ViewChild('formReset') formReset!: NgForm;
  loginUsers!: LoginUser;

  constructor(
    private serviceUser: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginUsers = new LoginUser()
  }

  gerarPin(){
    this.serviceUser.resetPin(this.loginUsers).subscribe(
      () =>{
        this.toastr.success('Verifique seu Email');
        this.formReset.reset();
      },
      (error) => {
        this.toastr.error('Erro durante o processo', error.error.message);
        this.formReset.reset();
      }
    );

  }

}
