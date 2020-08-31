import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-jw-pagination',
  templateUrl: './jw-pagination.component.html'
})
export class JwPaginationComponent implements OnInit{
  @Output() changePage = new EventEmitter<any>(true);
  @Input() pager;

  constructor() { }

  ngOnInit(): void {
      this.setPage(1);    
  }

   setPage(page: number) {     
    // call change page function in parent component
    this.changePage.emit(page);
  }
}
