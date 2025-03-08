import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { UserService } from '../services/user.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  imports: [
    FormsModule , CommonModule
  ],
  standalone: true,
})
export class UserDashboardComponent implements OnInit {
  movies: any[] = [];
  users: any[] = [];
  selectedUser: any = null;
  selectedMovie: any = null;
  editUser: any = null;

  constructor(
    private movieService: MovieService,
    private userService: UserService
  ) { }

  ngOnInit() {
    //this.loadMovies();
  }

  loadMovies() {
    this.movieService.getAllMovies().subscribe((response: any) => {
      this.movies = response;
    });
  }

  viewDetailsByImdbID(movie: any) {
    this.movieService.getMovieByImdbID(movie.imdbID).subscribe((details: any) => {
      this.selectedMovie = details;
    });
  }

  viewDetailsByTitleAndYear(movie: any) {
    this.movieService.getMovieByTitleAndYear(movie.Title, movie.Year).subscribe((details: any) => {
      this.selectedMovie = details;
    });
  }
}
