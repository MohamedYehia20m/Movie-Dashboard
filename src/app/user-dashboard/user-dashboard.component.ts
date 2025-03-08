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
  dbMovies: any[] = [];

  searchTitle: string = '';
  searchYear: string = '';
  searchImdbID: string = '';
  selectedMovie: any = null;

  constructor(
    private movieService: MovieService,
  ) { }

  ngOnInit() {
    //this.loadMovies();
  }

  // pagination
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalItems: number = 0;

  get paginatedMovies(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.dbMovies.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  get totalPages(): number {
    return Math.ceil(this.dbMovies.length / this.itemsPerPage);
  }


  loadAllMovies() {
    this.movieService.getAllMovies().subscribe((response: any) => {
      this.dbMovies = response;
      this.totalItems = this.dbMovies.length;
      this.currentPage = 1; // Reset to first page when loading new data
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

  clearSearch() {
    this.searchTitle = '';
    this.searchYear = '';
    this.searchImdbID = '';
    this.selectedMovie = null;
  }
}
