import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { FwkDataTableDataSource } from './fwk-data-table-datasource';

@Component({
  selector: 'app-fwk-data-table',
  templateUrl: './fwk-data-table.component.html',
  styleUrls: ['./fwk-data-table.component.css']
})
export class FwkDataTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: FwkDataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngAfterViewInit() {
    this.dataSource = new FwkDataTableDataSource(this.paginator, this.sort);
  }
}
