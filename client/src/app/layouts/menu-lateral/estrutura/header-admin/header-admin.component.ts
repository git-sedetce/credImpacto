import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-admin',
  standalone: false,
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css',
})
export class HeaderAdminComponent implements OnInit {
  authenticated: boolean = false;
  user_name: string = '';
  profile: number = 0;

  private sub!: Subscription;

  constructor(private serviceUser: UserService) {}

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    this.updateUserInfo(this.serviceUser.getUser());
    this.sub = this.serviceUser.user$.subscribe((user) => {
      this.updateUserInfo(user);
    });
  }

  ngOnDestroy(){
    if(this.sub) this.sub.unsubscribe();
  }

  updateUserInfo(user: any) {
    if(!user) {
      this.authenticated = false;
      this.user_name = '';
      this.profile = 0;
      return
    }

    this.authenticated = true;
    this.user_name = user._user_name;
    this.profile = Number(user._profile_id);
  }

  logout() {
    this.serviceUser.logout();
  }
}
