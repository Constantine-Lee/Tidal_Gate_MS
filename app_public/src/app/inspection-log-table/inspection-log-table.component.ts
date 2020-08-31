import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { InspectionLogService } from '../_services/inspectionLog.service';
import { InspectionLog } from '../_models/inspectionLog';
import { fadeInAnimation } from '../_animations';
import { LoggingService } from '../logging.service';
declare var $: any;

@Component({
  selector: 'app-inspection-log-table',
  templateUrl: './inspection-log-table.component.html',
    
  // make fade in animation available to this component
  animations: [fadeInAnimation]
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
  dateIsAscending: boolean = true;
  pager: any = {};
  receive: boolean;

  _idToDelete: number;

  constructor(private insepctionLogService: InspectionLogService,
    private logger: LoggingService) {}

  ngOnInit(): void {
    this.getInspectionLogs();

    // set page if items array isn't empty
    if (this.inspectionLogs && this.inspectionLogs.length) {
      this.setPage(this.initialPage);
    }
    this.receive = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    // reset page if items array has changed
    if (changes.inspectionLogs.currentValue !== changes.inspectionLogs.previousValue) {
      this.setPage(this.initialPage);
    }
  }

  generatePager(array: Array<InspectionLog>, page: number) {

    
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
          i.id.toString().includes(this.searchTerm) ||
          i.gate.includes(this.searchTerm) ||
          i.date_inspection.includes(this.searchTerm));
    }
    this.generatePager(arrayFilter, page);
  }

  sortLogId() {
    let idSorted: Array<InspectionLog> = [];
    if (this.logIdAscending == true) {
      idSorted = this.inspectionLogs.slice().sort((a, b) => b.id - a.id);
    }
    else {
      idSorted = this.inspectionLogs.slice().sort((a, b) => a.id - b.id);
    }
    this.logIdAscending = !this.logIdAscending;
    this.generatePager(idSorted, 1);
  }

  sortDate() {
    this.logger.info("Function: sortDate()");

    let arrSortedDate: Array<InspectionLog> = [];
    if (this.dateIsAscending == true) {
      this.logger.info("this.dateIsAscending == true");
      arrSortedDate = this.inspectionLogs.slice().sort((a, b) => new Date(b.date_inspection).getTime() - new Date(a.date_inspection).getTime());
    }
    else {
      this.logger.info("this.dateIsAscending == false");
      arrSortedDate = this.inspectionLogs.slice().sort((a, b) => new Date(a.date_inspection).getTime() - new Date(b.date_inspection).getTime());
    }
    this.dateIsAscending = !this.dateIsAscending;
    this.logger.info("arrSortedDate: " + arrSortedDate);
    this.generatePager(arrSortedDate, 1);
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

  showConfirmationModal(id: number) {
    this.logger.info("Function: showConfirmationModal(id: string)");
    this.logger.info("id: string" + id);

    this._idToDelete = id;
    $('#confirmationModal').modal('show');
  }

  delete(): void {
    this.logger.info("Function: delete()");
    this.inspectionLogs = this.inspectionLogs.filter(l => l._id !== this._idToDelete);
    this.setPage(1);
    this.insepctionLogService.deleteInspectionLog(this._idToDelete).subscribe();
  }
}
