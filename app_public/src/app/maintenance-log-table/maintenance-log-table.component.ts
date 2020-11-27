import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MaintenanceLogService } from '../_services/maintenanceLog.service';
import { MaintenanceLog } from '../_models/maintenanceLog';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { generate, Subject, throwError } from 'rxjs';
import { fadeInAnimation } from '../_animations';
import { LoggingService } from '../_services/logging.service';
import * as FileSaver from 'file-saver';
declare var $: any;

@Component({
  selector: 'app-maintenance-log-table',
  templateUrl: './maintenance-log-table.component.html',
  styles: ['.rw:hover { cursor:pointer; background-color: gainsboro } ', '.hoverBtn:hover {background-color: white}', 
  ''],
  animations: [fadeInAnimation]
})
export class MaintenanceLogTableComponent implements OnInit {
  private searchText$ = new Subject<string>();
  searchTerm: string = "";
  pageOfItems: MaintenanceLog[];
  pager: any = {};
  sortImportance: string[] = ['ID', 'DATE'];

  iDAscending: boolean = true;
  get iDSort(): number { return this.iDAscending ? 1 : -1 }

  dateAscending: boolean = true;
  get dateSort(): number { return this.dateAscending ? 1 : -1 }

  _idToDelete: string;

  constructor(
    private maintenanceLogService: MaintenanceLogService,
    private logger: LoggingService) {}

    ngOnInit(): void {
      this.logger.info("Lifecycle: ngOnInit()");
      this.getMaintenanceLogs(1);
      this.searchText$
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap(searchText => this.maintenanceLogService.getMaintenanceLogs(1, searchText, this.sortImportance, this.iDSort, this.dateSort))
        )
        .subscribe(x => {
          this.pageOfItems = x.maintenanceLogs;
          this.pager = x.pager;
        })
    }

    downloadPDF(id: string){
      this.maintenanceLogService.downloadPDF(id).subscribe((response) => {
        var blob = new Blob([response], { type: 'application/pdf' });
        FileSaver.saveAs(blob, 'report.pdf');
      },
        e => { throwError(e); });
    }

    getMaintenanceLogs(page: number) {
      this.logger.info("Functon: getMaintenanceLogs()");
      this.maintenanceLogService.getMaintenanceLogs(page, this.searchTerm, this.sortImportance, this.iDSort, this.dateSort)
        .subscribe(x => {
          this.pageOfItems = x.maintenanceLogs;
          this.pager = x.pager;
        })
    }

    toggleIDSort() {
      this.iDAscending = !this.iDAscending;
      if (this.sortImportance[0] != 'ID'){
        this.sortImportance.pop();
        this.sortImportance.unshift('ID');
      }
      this.getMaintenanceLogs(1);
    }

    toggleDateSort() {
      this.dateAscending = !this.dateAscending;
      if (this.sortImportance[0] == 'ID'){
        let temp = this.sortImportance[0];
        this.sortImportance[0] = this.sortImportance[1];
        this.sortImportance[1] = temp;
      }
      this.getMaintenanceLogs(1);
    }

    search(searchText: string){
      this.searchText$.next(searchText);
    }

    showConfirmationModal(id: string){
      this.logger.info("Function: showConfirmationModal(id: string)");
      this.logger.info("id: string" + id);

      this._idToDelete = id;
      $('#confirmationModal').modal('show');
    }

    delete(): void {
      this.logger.info("Function: delete()");
      this.maintenanceLogService.deleteMaintenanceLog(this._idToDelete).subscribe(_ => {
        this.pageOfItems = this.pageOfItems.filter(l => l._id !== this._idToDelete);
        this.getMaintenanceLogs(this.pager.curretPage);
      });
    }
}
