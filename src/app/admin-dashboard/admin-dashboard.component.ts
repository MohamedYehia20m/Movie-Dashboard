import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports:[FormsModule , CommonModule]

})
export class AdminDashboardComponent implements OnInit {
  dbMovies: any[] = [];
  omdbMovies: any[] = [];
  movie: any = null;

  searchTitle: string = '';
  searchYear: string = '';
  searchImdbID: string = '';
  selectedMovie: any = null;

  selectedOption: string = 'DB'; // Property to store the selected option


  constructor(
      private movieService: MovieService,
  ) { }

  ngOnInit() {
    //this.loadAllMovies();
  }

  onOptionChange(option: string) {
    this.selectedOption = option;
  }

  loadAllMovies() {
    this.movieService.getAllMovies().subscribe((movies: any) => {
      this.dbMovies = movies;
    });
  }

  getMovieFromDB(imdbID: string): void {
    this.movieService.getMovieByImdbID(imdbID).subscribe(
      (response) => {
        this.dbMovies = Array.isArray(response) ? response : [response]; // Ensure the response is an array
        console.log(this.dbMovies); // Check if the response is logged
      },
      (error) => {
        console.error('Error fetching movie:', error);
      }
    );
  }

  getMovieFromDBByTitleYear(title: string, year: string) {
    if (!title || !year) {
      alert('Title and year are required');
    }
    this.movieService.getMovieByTitleAndYear(title, year).subscribe(
      (response) => {
        this.dbMovies = Array.isArray(response) ? response : [response]; // Ensure the response is an array
        console.log(this.dbMovies); // Check if the response is logged
      },
      (error) => {
        console.error('Error fetching movie:', error);
      }
    );
  }

  searchMoviesOMDB() {
    if (this.searchTitle.trim()) {
      this.movieService.searchMovieByTitle_OMDB(this.searchTitle).subscribe((response: any) => {
        this.omdbMovies = response.Search;
      });
    }
  }

  getMovieFromOMDB(imdbID: string) {
    this.movieService.getMovieByImdbID_OMDB(imdbID).subscribe(
      (response: any) => {
      this.omdbMovies = Array.isArray(response) ? response : [response]; // Ensure the response is an array
      console.log(this.omdbMovies); // Check if the response is logged
    },
      (error) => {
        console.error('Error fetching movie:', error);
      }
    );
  }

  getMovieFromOMDBByTitleYear(title: string, year: string) {
    this.movieService.getMovieByTitleAndYear_OMDB(title, year).subscribe(
      (response: any) => {
      this.omdbMovies = Array.isArray(response) ? response : [response]; // Ensure the response is an array
        console.log(this.omdbMovies); // Check if the response is logged
      },
      (error) => {
        console.error('Error fetching movie:', error);
      }
    );
  }

  addMovieByImdbID(imdbID: string) {
    this.movieService.addMovieByImdbID(imdbID).subscribe(
      (movie: any) => {
        alert('Movie added successfully');
      },
      error => {
        alert('Error adding movie');
      }
    );
  }

  addMovieByTitleAndYear(title: string, year: string) {
    this.movieService.addMovieByTitleAndYear(title, year).subscribe(
      (movie: any) => {
        alert('Movie added successfully');
      },
      error => {
        alert('Error adding movie');
      }
    );
  }

  deleteMovie(imdbID: string) {
    this.movieService.deleteMovie(imdbID).subscribe(
      () => {
        alert('Movie deleted successfully');
      },
      error => {
        alert('Error deleting movie');
      }
    );
  }

  clearSearch() {
    this.searchTitle = '';
    this.searchYear = '';
    this.searchImdbID = '';
    this.selectedMovie = null;
  }
}
