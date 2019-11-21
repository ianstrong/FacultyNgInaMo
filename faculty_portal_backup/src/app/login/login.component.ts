import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { DataService } from 'app/services/data.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginCredentials: any = {};
  eId: string;
  ePass: string;

  constructor(private authService: AuthService, private ds: DataService, public router: Router) { }

  ngOnInit() {
    this.eId = '';
    this.ePass = '';

    this.loginCredentials.token = localStorage.getItem('FS_token');

    if (this.loginCredentials.token === null || this.loginCredentials.token === '') {

    } else {

      this.ds.pullData('checkuser', this.loginCredentials).subscribe((res) => {
        if (res.status.remarks) {
          this.authService.login(res.payload);
          localStorage.setItem('FS_info', JSON.stringify(res.data[0]));
          this.router.navigate(['/main/loads']);
        }
      });
    }

  }

  summitted(e) {

    e.preventDefault();

    if (this.eId === '' && this.ePass === '') {

    } else {

      this.loginCredentials.eId = this.eId;
      this.loginCredentials.ePass = this.ePass;

      this.ds.pullData('login', this.loginCredentials).subscribe(res => {
        if (res.status.remarks) {
          this.authService.login(res.payload);
          localStorage.setItem('FS_info', JSON.stringify(res.data[0]));
          Swal.fire({
            text: res.status.message,
            type: 'success'
          }).then(() => {
            this.router.navigate(['/main/loads']);
            }
          );

        } else {
          Swal.fire({
            text: res.status.message,
            type: 'error'
          });
        }


      });
    }
  }


}
