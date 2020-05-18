import { Component, OnInit, SimpleChanges } from '@angular/core';
import { User } from '.././_models/user';
import { Role } from '.././_models/role';
import { AuthenticationService } from '.././_services/authentication.service';
import { Gate } from '../_models/gate';
import paginate = require('jw-paginate');
import { GateService } from '../_services/gate.service';
import { fadeInAnimation } from '../_animations';

@Component({
  selector: 'app-gate-table',
  templateUrl: './gate-table.component.html',
    
  // make fade in animation available to this component
  animations: [fadeInAnimation]
})
export class GateTableComponent implements OnInit {
  gates: Array<Gate>;
  showDetails = false;

  pageOfItems: Array<Gate>;
  searchTerm: string = "";
  initialPage = 1;
  pageSize = 10;
  maxPages = 10;

  logIdAscending: boolean = true;
  pager: any = {};

  currentUser: User;
  receive: boolean;
  
  constructor(private gateService: GateService, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.getGates();

    // set page if items array isn't empty
    if (this.gates && this.gates.length) {
      this.setPage(this.initialPage);
    }
    this.receive = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    // reset page if items array has changed
    if (changes.gates.currentValue !== changes.gates.previousValue) {
      this.setPage(this.initialPage);
    }
  }

  generatePager(array: Array<Gate>, page: number){
    // get new pager object for specified page
    this.pager = paginate(array.length, page, this.pageSize, this.maxPages);
    // get new page of items from items array
    let pageOfItems = array.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // call change page function in parent component
    this.onChangePage(pageOfItems);
  }

  setPage(page: number) {
    let arrayFilter = this.gates;    
    if (this.searchTerm!="") {
      arrayFilter = this.gates
        .filter(i => 
          i.id.toString().includes(this.searchTerm)||
          i.name.includes(this.searchTerm));
    }
    this.generatePager(arrayFilter, page);
  }

  sortLogId(){
    let idSorted: Array<Gate> = [];    
    if(this.logIdAscending == true){      
      idSorted = this.gates.slice().sort((a, b) => b.id-a.id);
    } 
    else {
      idSorted = this.gates.slice().sort((a, b) => a.id-b.id);
    }
    this.logIdAscending = !this.logIdAscending;
    this.generatePager(idSorted, 1);
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  getGates() {
    this.gateService.getGates().subscribe(data => {
    this.gates = data;
      this.setPage(1);      
    });
  }

  delete(id: string): void {    
    this.gates = this.gates.filter(l => l._id !== id);
    this.setPage(1);
    this.gateService.deleteGate(id).subscribe();    
  }
  
  get isAdmin() {    
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
}
