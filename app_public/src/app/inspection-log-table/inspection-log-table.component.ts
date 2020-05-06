import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { InspectionLogService } from '../_services/inspectionLog.service';
import { InspectionLog } from '../_models/inspectionLog';
import paginate = require('jw-paginate');

@Component({
  selector: 'app-inspection-log-table',
  templateUrl: './inspection-log-table.component.html'
})
export class InspectionLogTableComponent implements OnInit {
  inspectionLogs: Array<InspectionLog>;
  showDetails = false;

  pageOfItems: Array<InspectionLog>;
  searchTerm: string = "";
  initialPage = 1;
  pageSize = 10;
  maxPages = 10;

  logIdAscending: boolean = true;
  pager: any = {};

  constructor(private insepctionLogService: InspectionLogService) {}

  ngOnInit(): void {
    this.getInspectionLogs();

    // set page if items array isn't empty
    if (this.inspectionLogs && this.inspectionLogs.length) {
      this.setPage(this.initialPage);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // reset page if items array has changed
    if (changes.inspectionLogs.currentValue !== changes.inspectionLogs.previousValue) {
      this.setPage(this.initialPage);
    }
  }

  generatePager(array: Array<InspectionLog>, page: number) {
    // get new pager object for specified page
    this.pager = paginate(array.length, page, this.pageSize, this.maxPages);
    // get new page of items from items array
    let pageOfItems = array.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // call change page function in parent component
    this.onChangePage(pageOfItems);
  }

  setPage(page: number) {
    let arrayFilter = this.inspectionLogs;
    console.log(this.searchTerm);
    if (this.searchTerm != "") {
      arrayFilter = this.inspectionLogs
        .filter(i =>
          i._id.toString().includes(this.searchTerm) ||
          i.gate.includes(this.searchTerm) ||
          i.date_inspection.includes(this.searchTerm));
    }
    this.generatePager(arrayFilter, page);
  }

  sortLogId() {
    let idSorted: Array<InspectionLog> = [];
    if (this.logIdAscending == true) {
      idSorted = this.inspectionLogs.slice().sort((a, b) => b._id - a._id);
    }
    else {
      idSorted = this.inspectionLogs.slice().sort((a, b) => a._id - b._id);
    }
    this.logIdAscending = !this.logIdAscending;
    this.generatePager(idSorted, 1);
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  getInspectionLogs() {
    this.insepctionLogService.getInspectionLogs().subscribe(data => {
      this.inspectionLogs = data;
      this.setPage(1);
    });
  }

  delete(id: number): void {
    this.inspectionLogs = this.inspectionLogs.filter(l => l._id !== id);
    this.setPage(1);
    this.insepctionLogService.deleteInspectionLog(id).subscribe();
  }
}
