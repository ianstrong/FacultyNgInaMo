import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'app/services/data.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})

export class TypographyComponent implements OnInit {

  students: any = {};
  studentInfo: any = {};


  displayedColumns: string[] = ['si_idnumber', 'si_fullname', 'si_course', 'si_department'];
  dataSource: any;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private ds: DataService) { }

  ngOnInit() {
    this.ds.pullData('students', this.studentInfo).subscribe((res) => {
      this.students = res;
      this.dataSource = new MatTableDataSource(this.students.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
