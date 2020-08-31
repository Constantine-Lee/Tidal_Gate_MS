import { Component, OnInit, SimpleChanges } from '@angular/core';
import { User } from '.././_models/user';
import { Role } from '.././_models/role';
import { AuthenticationService } from '.././_services/authentication.service';
import { Gate } from '../_models/gate';
import { GateService } from '../_services/gate.service';
import { fadeInAnimation } from '../_animations';
import { LoggingService } from '../logging.service';
declare var $: any;

@Component({
  selector: 'app-gate-table',
  templateUrl: './gate-table.component.html',

  // make fade in animation available to this component
  animations: [fadeInAnimation]
})
export class GateTableComponent implements OnInit {
  showDetails = false;

  pageOfItems: Gate[];
  searchTerm: string = "";
  pager: any = {};

  currentUser: User;
  receive: boolean;
  _idToDelete: string;

  constructor(private gateService: GateService,
    private authenticationService: AuthenticationService,
    private logger: LoggingService) { }

  ngOnInit(): void {
    this.logger.info("Lifecycle: ngOnInit()");
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getGates(1);
  }

  getGates(page: number) {
    this.logger.info("Function: getGates()");
    this.gateService.getGates(page).subscribe(
      x => {
        this.pageOfItems = x.gates;
        this.pager = x.pager;
        this.receive = true;
      }
    )
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

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
}
