import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { InspectionLogService } from '../_services/inspectionLog.service';
import { InspectionLog } from '../_models/inspectionLog';
import { fadeInAnimation } from '../_animations';
import { LoggingService } from '../_services/logging.service';
import { Subject, throwError } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import * as FileSaver from 'file-saver';
declare var $: any;

@Component({
  selector: 'app-inspection-log-table',
  templateUrl: './inspection-log-table.component.html',
  styles: ['.rw:hover { cursor:pointer; background-color: gainsboro } ', '.hoverBtn:hover {background-color: white}', 
  ''],
  animations: [fadeInAnimation]
})
export class InspectionLogTableComponent implements OnInit {
  private searchText$ = new Subject<string>();
  searchTerm: string = "";
  pageOfItems: InspectionLog[];
  pager: any = {};
  sortImportance: string[] = ['ID', 'DATE'];

  iDAscending: boolean = true;
  get iDSort(): number { return this.iDAscending ? 1 : -1 }

  dateAscending: boolean = true;
  get dateSort(): number { return this.dateAscending ? 1 : -1 }

  _idToDelete: number;

  constructor(
    private inspectionLogService: InspectionLogService,
    private logger: LoggingService) { }

  ngOnInit(): void {
    this.logger.info("Lifecycle: ngOnInit()");
    this.getInspectionLogs(1);
    this.searchText$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(searchText => this.inspectionLogService.getInspectionLogs(1, searchText, this.sortImportance, this.iDSort, this.dateSort))
      )
      .subscribe(x => {
        this.pageOfItems = x.inspectionLogs;
        this.pager = x.pager;
      })
  }

  downloadPDF(id: string){
    this.inspectionLogService.downloadPDF(id).subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      FileSaver.saveAs(blob, 'report.pdf');
    },
      e => { throwError(e); });
  }

  getInspectionLogs(page: number) {
    this.logger.info("Function: getInspectionLogs()");
    this.inspectionLogService.getInspectionLogs(page, this.searchTerm, this.sortImportance, this.iDSort, this.dateSort)
      .subscribe(x => {
        this.pageOfItems = x.inspectionLogs;
        this.pager = x.pager;
      })
  }

  toggleIDSort() {
    this.iDAscending = !this.iDAscending;
    if (this.sortImportance[0] != 'ID') {
      this.sortImportance.pop(); 
      this.sortImportance.unshift('ID');
    }
    this.getInspectionLogs(1);
  }

  toggleDateSort() {
    this.dateAscending = !this.dateAscending;   
    if (this.sortImportance[0] == 'ID'){
      console.log('before ' + this.sortImportance);
      let temp = this.sortImportance[0];
      this.sortImportance[0] = this.sortImportance[1];
      this.sortImportance[1] = temp;
      console.log('after ' + this.sortImportance);
    }
    this.getInspectionLogs(1);
  }

  search(searchText: string) {
    this.searchText$.next(searchText);
  }

  showConfirmationModal(id: number) {
    this.logger.info("Function: showConfirmationModal(id: string)");
    this.logger.info("id: string" + id);

    this._idToDelete = id;
    $('#confirmationModal').modal('show');
  }

  delete(): void {
    this.logger.info("Function: delete()");
    this.inspectionLogService.deleteInspectionLog(this._idToDelete).subscribe(_ => {
      this.pageOfItems = this.pageOfItems.filter(l => l._id !== this._idToDelete);
      this.getInspectionLogs(this.pager.currentPage);
    });
  }
}
