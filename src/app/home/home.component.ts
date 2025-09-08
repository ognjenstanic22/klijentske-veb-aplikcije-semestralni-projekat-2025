import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieModel } from '../../models/movie.model';
import { AxiosError } from 'axios';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, SlicePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public movies: MovieModel[] | null = null
  public error: string | null = null

  constructor() {
    MovieService.getMovies()
      .then(rsp => this.movies = rsp.data)
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
  }

  public formatDate(iso: string){
    return new Date(iso).toLocaleString('sr-RS')
  }

  public generateMovieImage(movieImage: string){
    return `${movieImage}`
  }
}
