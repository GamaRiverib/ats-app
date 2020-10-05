import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PATHS } from 'src/app/app.values';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
    this.authService.getAccessToken().then((accessToken: string) => {
      if (accessToken) {
        this.router.navigate([ PATHS.HOME ]);
      } else {
        console.log('Not authenticated');
      }
    }).catch((reason: any) => {
      console.log('Not authenticated', reason);
    });
  }

  async loginWithMikrobot() {
    console.log(' :: Sign In with Mikrobot Account :: ');
    try {
      const accessToken: string | null = await this.authService.getAccessToken();
      if (accessToken === null) {
        await this.authService.login();
      }
      this.router.navigate([ PATHS.HOME ]);
    } catch (error) {
      console.log('loginWithMikrobot Error', error);
      const toast = await this.toastController.create({
        message: 'Something was wrong',
        duration: 2000
      });
      toast.present();
    }
  }

}
