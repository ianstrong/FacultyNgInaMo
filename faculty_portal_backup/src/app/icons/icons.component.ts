import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {


  filemodaltitle: String = '';
  userinfo: any = {};
  classinfo: any = {};
  classes: any = {};
  files: any = {};

  constructor(private ds: DataService) { }

  ngOnInit() {

    this.userinfo = JSON.parse(localStorage.getItem('FS_info'));
    this.ds.pullData('getclass', this.userinfo).subscribe((res) => {
      this.classes = res;
      console.log(this.classes);
    });

  }

  getFiles(classId) {
    this.filemodaltitle = classId;
    this.classinfo.classId = classId;
    this.ds.pullData('getfiles', this.classinfo).subscribe((res) => {
      this.files = res;
    });
  }

  uploadFiles(e) {

    const fd = new FormData();
    e.preventDefault();

    fd.append('classId', e.target[0].value);
    fd.append('file', <File>e.target[1].files[0], e.target[1].files[0].name);

    this.ds.pushFile('addfile', fd).subscribe((res) => {
      if (res.status.remarks) {
        Swal.fire({
          text: res.status.message,
          type: 'success'
        }).then(() => {
          this.getFiles(e.target[0].value);
        });
      } else {
        Swal.fire({
          text: res.status.message,
          type: 'error'
        });
      }
    });
  }
}
