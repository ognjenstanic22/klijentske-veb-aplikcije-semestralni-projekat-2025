import { Injectable } from '@angular/core';
import { MovieModel } from '../models/movie.model';
import { MovieGenreModel } from '../models/movieGenre.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS')
  }

  public generateMovieImage(movieImage: string) {
    return `${movieImage}`
  }

  public generateMoviePrice(moviePrice: number) {
    return moviePrice * 8;
  }

  public getGenres(allGenres: MovieGenreModel[] | null) {
    let genre: string[] | null = []

    if (allGenres) {
      for (let element of allGenres) {
        genre.push(element.genre.name)
      }
    }

    return genre;
  }
}
