import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MaintenanceLogService } from '../_services/maintenanceLog.service';
import { MaintenanceLog } from '../_models/maintenanceLog';
import paginate = require('jw-paginate');
import { map } from 'rxjs/operators';
import { generate } from 'rxjs';

@Component({
  selector: 'app-maintenance-log-table',
  templateUrl: './maintenance-log-table.component.html'
})
export class MaintenanceLogTableComponent implements OnInit {
  maintenanceLogs: Array<MaintenanceLog>;
  showDetails = false;

  pageOfItems: Array<MaintenanceLog>;
  searchTerm: string = "";
  initialPage = 1;
  pageSize = 10;
  maxPages = 10;

  logIdAscending: boolean = true;
  pager: any = {};

  currentViewLog: MaintenanceLog;

  constructor(private maintenanceLogService: MaintenanceLogService) { }

  ngOnInit(): void {
    this.getMaintenanceLogs();

    // set page if items array isn't empty
    if (this.maintenanceLogs && this.maintenanceLogs.length) {
      this.setPage(this.initialPage);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // reset page if items array has changed
    if (changes.maintenanceLogs.currentValue !== changes.maintenanceLogs.previousValue) {
      this.setPage(this.initialPage);
    }
  }

  generatePager(array: Array<MaintenanceLog>, page: number){
    // get new pager object for specified page
    this.pager = paginate(array.length, page, this.pageSize, this.maxPages);
    // get new page of items from items array
    let pageOfItems = array.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // call change page function in parent component
    this.onChangePage(pageOfItems);
  }

  setPage(page: number) {
    let arrayFilter = this.maintenanceLogs;
    console.log(this.searchTerm);
    if (this.searchTerm!="") {
      arrayFilter = this.maintenanceLogs
        .filter(i => 
          i._id.toString().includes(this.searchTerm)||
          i.gate.includes(this.searchTerm)||
          i.date_maintenance.includes(this.searchTerm)||
          i.action_taken.includes(this.searchTerm)||
          i.action_needed.includes(this.searchTerm));
    }
    this.generatePager(arrayFilter, page);
  }

  sortLogId(){
    let idSorted: Array<MaintenanceLog> = [];    
    if(this.logIdAscending == true){      
      idSorted = this.maintenanceLogs.slice().sort((a, b) => b._id-a._id);
    } 
    else {
      idSorted = this.maintenanceLogs.slice().sort((a, b) => a._id-b._id);
    }
    this.logIdAscending = !this.logIdAscending;
    this.generatePager(idSorted, 1);
  }


  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  getMaintenanceLogs() {
    this.maintenanceLogService.getMaintenanceLogs().subscribe(data => {
    this.maintenanceLogs = data;
      this.setPage(1);      
    });
  }

  delete(id: number): void {    
    this.maintenanceLogs = this.maintenanceLogs.filter(l => l._id !== id);
    this.setPage(1);
    this.maintenanceLogService.deleteMaintenanceLog(id).subscribe();    
  }
}
