import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MaintenanceLogService } from '../_services/maintenanceLog.service';
import { MaintenanceLog } from '../_models/maintenanceLog';
import paginate = require('jw-paginate');
import { map } from 'rxjs/operators';
import { generate } from 'rxjs';
import { fadeInAnimation } from '../_animations';
import { NGXLogger } from 'ngx-logger';

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
  pager: any = {};

  currentViewLog: MaintenanceLog;
  receive: boolean;

  constructor(private maintenanceLogService: MaintenanceLogService,
              private logger: NGXLogger) { }

  ngOnInit(): void {
    this.getMaintenanceLogs();

    // set page if items array isn't empty
    if (this.maintenanceLogs && this.maintenanceLogs.length) {
      this.setPage(this.initialPage);
    }
    this.receive = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.logger.log("Function: ngOnChanges");
    
    // reset page if items array has changed
    if (changes.maintenanceLogs.currentValue !== changes.maintenanceLogs.previousValue) {
      this.setPage(this.initialPage);
    }
  }

  getMaintenanceLogs() {
    this.logger.log("Function: getMaintenanceLogs");

    this.maintenanceLogService.getMaintenanceLogs().subscribe(data => {
      this.maintenanceLogs = data;
      this.setPage(1);
    });
    this.logger.info("this.maintenanceLogs: "+ this.maintenanceLogs);
  }

  setPage(page: number) {    
    this.logger.log("Function: setPage");

    let arrayFilter = this.maintenanceLogs;
    this.logger.info("arrayFilter: "+arrayFilter);

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
    this.logger.info("arrayFilter after Filter: "+arrayFilter);

    this.generatePager(arrayFilter, page);
  }

  generatePager(array: Array<MaintenanceLog>, page: number) {
    this.logger.log("Function: generatePager");

    // get new pager object for specified page
    this.pager = paginate(array.length, page, this.pageSize, this.maxPages);
    this.logger.info("this.pager: "+this.pager);

    // get new page of items from items array
    let pageOfItems = array.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.logger.info("pageOfItems"+pageOfItems);

    // call change page function in parent component
    this.onChangePage(pageOfItems);
  }

  onChangePage(pageOfItems: Array<any>) {
    this.logger.log("Function: onChangePage");

    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  sortLogID() {
    this.logger.log("Function: sortLogID");

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
    this.logger.info("arrSortedID: "+arrSortedID);
    this.generatePager(arrSortedID, 1);
  }

  delete(id: number): void {
    this.logger.log("Function: delete(id: number)");

    this.logger.info("this.maintenanceLogs before Filter: "+this.maintenanceLogs);
    this.maintenanceLogs = this.maintenanceLogs.filter(l => l._id !== id);
    this.logger.info("this.maintenanceLogs after Filter: "+this.maintenanceLogs);
    
    this.setPage(1);
    this.maintenanceLogService.deleteMaintenanceLog(id).subscribe();
  }
}
