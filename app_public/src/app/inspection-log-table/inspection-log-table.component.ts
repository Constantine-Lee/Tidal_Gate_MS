import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { InspectionLogService } from '../_services/inspectionLog.service';
import { InspectionLog } from '../_models/inspectionLog';
import { fadeInAnimation } from '../_animations';
import { LoggingService } from '../_services/logging.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-inspection-log-table',
  templateUrl: './inspection-log-table.component.html',

  // make fade in animation available to this component
  animations: [fadeInAnimation]
})
export class InspectionLogTableComponent implements OnInit {
  private searchText$ = new Subject<string>();
  searchTerm: string = "";
  pageOfItems: InspectionLog[];
  pager: any = {};


  logIdAscending: boolean = true;
  dateIsAscending: boolean = true;

  receive: boolean;
  _idToDelete: number;

  constructor(private inspectionLogService: InspectionLogService,
    private logger: LoggingService) { }

  ngOnInit(): void {
    this.logger.info("Lifecycle: ngOnInit()");
    this.getInspectionLogs(1);
    this.searchText$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(searchText => this.inspectionLogService.getInspectionLogs(1, searchText))
      )
      .subscribe(x => {
        this.logger.info("succeed: " + JSON.stringify(x));
        this.pageOfItems = x.inspectionLogs;
        this.pager = x.pager;
      })
  }


  getInspectionLogs(page: number) {
    this.logger.info("Function: getInspectionLogs()");
    this.inspectionLogService.getInspectionLogs(page, this.searchTerm)
      .subscribe(x => {
        this.pageOfItems = x.inspectionLogs;
        this.pager = x.pager;
        this.receive = true;
      })
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
