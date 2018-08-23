import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Major } from './major';

@Injectable({
  providedIn: 'root'
})
export class MajorService {

  private url = './assets/data/majors.json';

  constructor(private http: HttpClient) { }
  
  getMajor(id: string): Observable<Major> {
    return this.http.get<Major[]>(this.url).pipe(
      map(majors => majors.find(major => major.id === id))
    );
  }
}