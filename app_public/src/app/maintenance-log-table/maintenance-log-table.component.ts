import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MaintenanceLogService } from '../_services/maintenanceLog.service';
import { MaintenanceLog } from '../_models/maintenanceLog';
import { map } from 'rxjs/operators';
import { generate } from 'rxjs';
import { fadeInAnimation } from '../_animations';
import { LoggingService } from '../logging.service';
declare var $: any;

@Component({
  selector: 'app-maintenance-log-table',
  templateUrl: './maintenance-log-table.component.html',

  // make fade in animation available to this component
  animations: [fadeInAnimation]
})
export class MaintenanceLogTableComponent implements OnInit {
  maintenanceLogs: Array<MaintenanceLog>;
  showDetails = false;

  pageOfItems: Array<MaintenanceLog>;
  searchTerm: string = "";
  initialPage = 1;
  pageSize = 10;
  maxPages = 10;

  idIsAscending: boolean = true;
  dateIsAscending: boolean = true;
  pager: any = {};

  currentViewLog: MaintenanceLog;
  receive: boolean;

  _idToDelete: number;

  constructor(private maintenanceLogService: MaintenanceLogService,
    private logger: LoggingService) { }

  ngOnInit(): void {
    this.getMaintenanceLogs();

    // set page if items array isn't empty
    if (this.maintenanceLogs && this.maintenanceLogs.length) {
      this.setPage(this.initialPage);
    }
    this.receive = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.logger.info("Function: ngOnChanges");

    // reset page if items array has changed
    if (changes.maintenanceLogs.currentValue !== changes.maintenanceLogs.previousValue) {
      this.setPage(this.initialPage);
    }
  }

  getMaintenanceLogs() {
    this.logger.info("Function: getMaintenanceLogs");

    this.maintenanceLogService.getMaintenanceLogs().subscribe(data => {
      this.maintenanceLogs = data;
      this.setPage(1);
    });
    this.logger.info("this.maintenanceLogs: " + this.maintenanceLogs);
  }

  setPage(page: number) {
    this.logger.info("Function: setPage");

    let arrayFilter = this.maintenanceLogs;
    this.logger.info("arrayFilter: " + arrayFilter);

    //filer array with results contain search term
    if (this.searchTerm != "") {
      arrayFilter = this.maintenanceLogs
        .filter(i =>
          i.id.toString().includes(this.searchTerm) ||
          i.gate.includes(this.searchTerm) ||
          i.date_maintenance.includes(this.searchTerm) ||
          i.action_taken.includes(this.searchTerm) ||
          i.action_needed.includes(this.searchTerm));
    }
    this.logger.info("arrayFilter after Filter: " + arrayFilter);

    this.generatePager(arrayFilter, page);
  }

  generatePager(array: Array<MaintenanceLog>, page: number) {
    this.logger.info("Function: generatePager");

    this.logger.info("this.pager: " + this.pager);

    // get new page of items from items array
    let pageOfItems = array.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.logger.info("pageOfItems" + pageOfItems);

    // call change page function in parent component
    this.onChangePage(pageOfItems);
  }

  onChangePage(pageOfItems: Array<any>) {
    this.logger.info("Function: onChangePage");

    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  sortID() {
    this.logger.info("Function: sortLogID()");

    let arrSortedID: Array<MaintenanceLog> = [];
    if (this.idIsAscending == true) {
      this.logger.info("this.idIsAscending == true");
      arrSortedID = this.maintenanceLogs.slice().sort((a, b) => b.id - a.id);
    }
    else {
      this.logger.info("this.idIsAscending == false");
      arrSortedID = this.maintenanceLogs.slice().sort((a, b) => a.id - b.id);
    }
    this.idIsAscending = !this.idIsAscending;
    this.logger.info("arrSortedID: " + arrSortedID);
    this.generatePager(arrSortedID, 1);
  }

  sortDate() {
    this.logger.info("Function: sortDate()");

    let arrSortedDate: Array<MaintenanceLog> = [];
    if (this.dateIsAscending == true) {
      this.logger.info("this.dateIsAscending == true");
      arrSortedDate = this.maintenanceLogs.slice().sort((a, b) => new Date(b.date_maintenance).getTime() - new Date(a.date_maintenance).getTime());
    }
    else {
      this.logger.info("this.dateIsAscending == false");
      arrSortedDate = this.maintenanceLogs.slice().sort((a, b) => new Date(a.date_maintenance).getTime() - new Date(b.date_maintenance).getTime());
    }
    this.dateIsAscending = !this.dateIsAscending;
    this.logger.info("arrSortedDate: " + arrSortedDate);
    this.generatePager(arrSortedDate, 1);
  }

  showConfirmationModal(id: number) {
    this.logger.info("Function: showConfirmationModal(id: string)");
    this.logger.info("id: string" + id);

    this._idToDelete = id;
    $('#confirmationModal').modal('show');
  }

  delete(): void {
    this.logger.info("Function: delete()");

    this.logger.info("this.maintenanceLogs before Filter: " + this.maintenanceLogs);
    this.maintenanceLogs = this.maintenanceLogs.filter(l => l._id !== this._idToDelete);
    this.logger.info("this.maintenanceLogs after Filter: " + this.maintenanceLogs);

    this.setPage(1);
    this.maintenanceLogService.deleteMaintenanceLog(this._idToDelete).subscribe();
  }
}
