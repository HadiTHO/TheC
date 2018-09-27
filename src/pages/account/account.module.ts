import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPage } from './account';
import { GoogleLoginComponent } from '../../components/google-login/google-login';

@NgModule({
  declarations: [
    AccountPage,
    GoogleLoginComponent
  ],
  imports: [
    IonicPageModule.forChild(AccountPage),
  ],
})
export class AccountPageModule {}
