import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginUser } from '../../../model/login-user.model';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-senha',
  standalone: false,
  templateUrl: './reset-senha.component.html',
  styleUrl: './reset-senha.component.css'
})
export class ResetSenhaComponent implements OnInit{
  @ViewChild("formResetPassword") formResetPassword!: NgForm;
  resetSenha!: LoginUser;

  constructor(
    private serviceUser: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.resetSenha = new LoginUser()
  }

  reset(): void {
    // console.log('resetSenha', this.resetSenha)
    this.serviceUser.reset_password(this.resetSenha).subscribe({
      next:(res:any) => {
        this.toastr.success('Senha alterada com sucesso!!!')
        this.router.navigate(['/login'])
      },error: (e) => {
        console.error(e)
        this.toastr.error(e.error.message)
        this.formResetPassword.reset()
      }
    })
  }

}
