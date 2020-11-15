import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Changelog } from '../_models/changelog';
import { environment } from '../../environments/environment';
import { fadeInAnimation } from '../_animations';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',

  // make fade in animation available to this component
  animations: [fadeInAnimation]
})
export class ChangelogComponent implements OnInit {

  changelogs: Changelog[]

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.http);
    this.http.get<Changelog[]>(`${environment.apiUrl}/changelogs`).subscribe(changelogs => {
      console.log(changelogs);
      this.changelogs = changelogs;
      
  });
}

}
