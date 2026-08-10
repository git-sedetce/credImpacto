import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-admin',
  standalone: false,
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent implements OnInit {
  authenticated: boolean = false;
  user_name: string = '';
  profile: number = 0;

  ngOnInit(): void {
  }

  logout(){
  }
}
