import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UsersListComponent } from './users-list/users-list.component';

@NgModule({
  declarations: [
    UserComponent,
    LoginComponent,
    ProfileComponent,
    CreateUserComponent,
    UsersListComponent,
  ],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
