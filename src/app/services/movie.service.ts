import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse , HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:8080/api/movies';

  constructor(private http: HttpClient , private authService: AuthService) { }

  getAllMovies() {
    return this.http.get(this.apiUrl, { withCredentials: true });
  }

  getMovieByImdbID(imdbID: string) : Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/db/${imdbID}`, {withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  getMovieByTitleAndYear(title: string, year: string) {
    return this.http.get(`${this.apiUrl}/db/${title}/${year}`, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  searchMovieByTitle_OMDB(title: string) {
    return this.http.get(`${this.apiUrl}/omdb/search/${title}`, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  getMovieByImdbID_OMDB(imdbID: string) {
    return this.http.get(`${this.apiUrl}/omdb/${imdbID}`, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  getMovieByTitleAndYear_OMDB(title: string, year: string) {
    return this.http.get(`${this.apiUrl}/omdb/${title}/${year}`, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  addMovieByImdbID(imdbID: string) {
    return this.http.post(`${this.apiUrl}/${imdbID}`, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  addMovieByTitleAndYear(title: string, year: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post<any>(`${this.apiUrl}/${title}/${year}`, headers, {withCredentials : true}).pipe(
      catchError(this.handleError)
    );
  }

  deleteMovie(imdbID: string) {
    return this.http.delete(`${this.apiUrl}/${imdbID}`, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
