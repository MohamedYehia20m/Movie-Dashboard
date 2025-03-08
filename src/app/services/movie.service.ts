import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:8080/api/movies';

  constructor(private http: HttpClient) { }

  getAllMovies() {
    return this.http.get(this.apiUrl, { withCredentials: true });
  }

  getMovieByImdbID(imdbID: string) {
    return this.http.get(`${this.apiUrl}/db/${imdbID}`, {withCredentials: true }).pipe(
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

  addMovieByTitleAndYear(title: string, year: string) {
    return this.http.post(`${this.apiUrl}/${title}/${year}`, { withCredentials: true }).pipe(
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
