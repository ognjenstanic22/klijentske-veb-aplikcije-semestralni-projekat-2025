import { Injectable } from '@angular/core';
import { MovieGenreModel } from '../models/movieGenre.model';
import { MovieActorsModel } from '../models/movieActors.model';
import { DirectorModel } from '../models/director.model';

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

  public getDirector(directorObj: DirectorModel | null): string{
    let director: string | null =  directorObj!.name;

    return director
  }

  public getActors(allActors: MovieActorsModel[] | null): string[]{
    let actor: string[] = []

    if(allActors){
      for (let element of allActors){
        actor.push(element.actor.name)
      }
    }

    return actor
  }

  public getGenres(allGenres: MovieGenreModel[] | null): string[] {
    let genre: string[] | null = []

    if (allGenres) {
      for (let element of allGenres) {
        genre.push(element.genre.name)
      }
    }

    return genre;
  }
}
