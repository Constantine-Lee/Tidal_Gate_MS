import { Component, OnInit, SimpleChanges } from '@angular/core';
import { User } from '.././_models/user';
import { Role } from '.././_models/role';
import { AuthenticationService } from '.././_services/authentication.service';
import { Gate } from '../_models/gate';
import { GateService } from '../_services/gate.service';
import { fadeInAnimation } from '../_animations';
import { LoggingService } from '../_services/logging.service';
import { Observable, Subject, throwError } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import * as FileSaver from 'file-saver';

declare var $: any;

@Component({
  selector: 'app-gate-table',
  templateUrl: './gate-table.component.html',

  // make fade in animation available to this component
  animations: [fadeInAnimation]
})
export class GateTableComponent implements OnInit {
  private searchText$ = new Subject<string>();
  searchTerm: string = "";
  pageOfItems: Gate[];
  pager: any = {};

  currentUser: User;
  receive: boolean;
  _idToDelete: string;
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  constructor(private gateService: GateService,
    private authenticationService: AuthenticationService,
    private logger: LoggingService) { }

  ngOnInit(): void {
    this.logger.info("Lifecycle: ngOnInit()");
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getGates(1);
    this.searchText$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(searchText => this.gateService.getGates(1, searchText, 10))
      )
      .subscribe(x => {
        this.logger.info("succeed");
        this.pageOfItems = x.gates;
        this.pager = x.pager;
      }
      )
  }

  downloadPDF(id: string){
    this.gateService.downloadPDF(id).subscribe((response) => {
      var blob = new Blob([response], { type: 'application/pdf' });
      FileSaver.saveAs(blob, 'report.pdf');
    },
      e => { throwError(e); });
  }

  getGates(page: number) {
    this.logger.info("Function: getGates()");
    this.gateService.getGates(page, this.searchTerm, 10)
      .subscribe(x => {
        this.pageOfItems = x.gates;
        this.pager = x.pager;
        this.receive = true;
      }
      )
  }

  search(searchText: string) {
    this.searchText$.next(searchText);
  }

  showConfirmationModal(id: string) {
    this.logger.info("Function: showConfirmationModal(id: string)");
    this.logger.info("id: string" + id);

    this._idToDelete = id;
    $('#confirmationModal').modal('show');
  }

  delete(): void {
    this.logger.info("Function: delete()");
    this.gateService.deleteGate(this._idToDelete).subscribe(_ => {
      this.pageOfItems = this.pageOfItems.filter(l => l._id !== this._idToDelete);
      this.getGates(this.pager.currentPage);
    });
  }
}
