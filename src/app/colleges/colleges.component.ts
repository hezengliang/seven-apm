import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { chunk } from 'lodash';

import { College } from '../college';
import { CollegeService } from '../college.service';

@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css']
})
export class CollegesComponent implements OnInit {
  faSearch = faSearch;
  private _colleges$: Observable<College[]>;
  private _collegesInUS$: Observable<College[][]>;
  private _collegesInGB$: Observable<College[][]>;
  private _collegesInRest$: Observable<College[][]>;
  private pageSize: number = 5;
  private currentPage: number = 0;
  // pages: string[];
  // currentPage: string = '1';

  constructor(private collegeService: CollegeService) { }

  ngOnInit() {
    this.colleges$ = this.collegeService.getColleges();
    // this.pages = ['1', '2', '3', '4'];
  }
  
  set colleges$(values$: Observable<College[]>) {
    this._colleges$ = values$;
    this._collegesInUS$ = values$.pipe(
      map(colleges => colleges.filter(college => college.country === 'us')),
      map(colleges => chunk(colleges, this.pageSize))
    );
    this._collegesInGB$ = values$.pipe(
      map(colleges => colleges.filter(college => college.country === 'gb')),
      map(colleges => chunk(colleges, this.pageSize))
    );
    this._collegesInRest$ = values$.pipe(
      map(colleges => colleges.filter(college => college.country !== 'us' && college.country !== 'gb')),
      map(colleges => chunk(colleges, this.pageSize))
    );
  }
  
  get collegesInUS$(): Observable<College[][]> {
    return this._collegesInUS$;
  }
  
  get collegesInGB$(): Observable<College[][]> {
    return this._collegesInGB$;
  }
  
  get collegesInRest$(): Observable<College[][]> {
    return this._collegesInRest$;
  }
  
  isFirstPage(): boolean {
    return true;
  }
  
  isLastPage(): boolean {
    return false;
  }
  
  nextPage() {
    
  }
  
  previousPage() {
    
  }
  
  goToPage() {
    
  }

}
