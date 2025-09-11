import { Injectable } from '@angular/core';
import { MovieModel } from '../models/movie.model';
import { GenreModel } from '../models/genre.model';

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

  public getGenres(allGenres: GenreModel[] | null) {
    let genre: string[] | null = []

    if (allGenres) {
      for (let element of allGenres) {
        genre.push(element.genre.name)
      }
    }

    return genre;
  }
}
