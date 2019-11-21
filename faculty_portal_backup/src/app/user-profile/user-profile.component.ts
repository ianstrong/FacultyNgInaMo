import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userinfo: any = {};
  constructor() { }

  ngOnInit() {
    this.userinfo = JSON.parse(localStorage.getItem('FS_info'));
  }

}
