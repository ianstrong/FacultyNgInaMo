import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})

export class TableListComponent implements OnInit {

  userinfo: any = {};
  classinfo: any = {};
  classes: any = {};
  students: any = {};
  classIdModal: String = '';
  fileModal = '';


  constructor(private ds: DataService) { }

  ngOnInit() {

    this.userinfo = JSON.parse(localStorage.getItem('FS_info'));
    this.ds.pullData('getclass', this.userinfo).subscribe((res) => {
      this.classes = res;
      console.log(this.classes);
    });

  }

  getClassStudents(classId) {
    this.classIdModal = classId;
    this.classinfo.classId = classId;
    this.ds.pullData('getClassStudents', this.classinfo).subscribe((res) => {
      this.students = res;
      console.log(res);
    });
  }

  uploadGrades(e) {
    const fd = new FormData();
    e.preventDefault();
    console.log(e);

    fd.append('classId', e.target[0].value);
    fd.append('file', <File>e.target[1].files[0], e.target[1].files[0].name);

    this.ds.pushFile('uploadGrade', fd).subscribe((res) => {
      if (res.status.remarks) {
        Swal.fire({
          text: res.status.message,
          type: 'success'
        }).then(() => {
          this.getClassStudents(e.target[0].value);
          this.fileModal = '';
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
