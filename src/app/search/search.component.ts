import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { LoadingComponent } from "../loading/loading.component";
import { RouterLink } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { GenreModel } from '../../models/genre.model';
import { MovieGenreModel } from '../../models/movieGenre.model';
import { ActorModel } from '../../models/actor.model';

@Component({
  selector: 'app-search',
  imports: [
    NgIf,
    NgFor,
    MatButtonModule,
    LoadingComponent,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatListModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  allData: MovieModel[] | null = null
  dataSource: MovieModel[] | null = null
  GenreData: GenreModel[] | null = null
  actorData: ActorModel[] | null = null

  directors: string[] = []
  selectedDirector: string | null = null

  actors: string[] | null = null
  selectedActor: string | null = null

  genres: string[] | null = null
  selectedGenre: string | null = null

  runtimeList: number[] | null = null
  selectedRuntime: number | null = null

  projectionDate: string[] | null = null
  selectedProj: string | null = null

  releaseDate: string[] | null = null
  selectedRelease: string | null = null

  userInput: string = ''

  public constructor(public utils: UtilsService) {
    MovieService.getMovies()
      .then(rsp => {
        this.allData = rsp.data
        // for(let m of this.allData!){
        //   m.price = Math.floor((Math.random() * (10 - 5 + 1) + 5)*100)
        // }
        this.dataSource = rsp.data
        this.generateSearchCriteria(rsp.data)
      })
    MovieService.getMovieGenres()
      .then(rsp => {
        this.GenreData = rsp.data
        this.generateGenreCriteria(rsp.data)
      })
    MovieService.getMovieActors()
      .then(rsp => {
        this.actorData = rsp.data
        this.generateActorCriteria(rsp.data)
      })
  }

  public generateGenreCriteria(source: GenreModel[]) {
    this.genres = source.map((obj: GenreModel) => obj.name)
      .filter((genre: string, i: number, arr: any[]) => arr.indexOf(genre) === i)
  }

  public generateActorCriteria(source: ActorModel[]) {
    this.actors = source.map((obj: ActorModel) => obj.name)
      .filter((actor: string, i: number, arr: any[]) => arr.indexOf(actor) === i)
  }

  public generateSearchCriteria(source: MovieModel[]) {
    this.directors = source.map((obj: MovieModel) => obj.director.name)
      .filter((director: string, i: number, arr: any[]) => arr.indexOf(director) === i)
    this.runtimeList = source.map((obj: MovieModel) => obj.runTime)
      .filter((runtime: number, i: number, arr: any[]) => arr.indexOf(runtime) === i)
    this.projectionDate = source.map((obj: MovieModel) => this.utils.formatDate(obj.createdAt))
      .filter((proj: string, i: number, arr: any[]) => arr.indexOf(proj) === i)
    this.releaseDate = source.map((obj: MovieModel) => this.utils.formatDate(obj.startDate))
      .filter((start: string, i: number, arr: any[]) => arr.indexOf(start) === i)

  }

  public doReset() {
    this.userInput = ''
    this.selectedDirector = null
    this.selectedRuntime = null
    this.selectedGenre = null
    this.selectedActor = null
    this.selectedProj = null
    this.selectedRelease = null
    this.dataSource = this.allData
    this.generateActorCriteria(this.actorData!)
    this.generateGenreCriteria(this.GenreData!)
    this.generateSearchCriteria(this.allData!)
  }

  public doFilterChain() {
    if (this.allData == null) return

    this.dataSource = this.allData!
      .filter(obj => {
        if (this.userInput == '') return true
        return obj.title.includes(this.userInput) ||
          obj.runTime.toString().includes(this.userInput) ||
          obj.director.name.includes(this.userInput)
      })
      .filter(obj => {
        if (this.selectedDirector == null) return true
        return obj.director.name === this.selectedDirector
      })
      .filter(obj => {
        if (this.selectedRuntime == null) return true
        return obj.runTime === this.selectedRuntime
      })
      .filter(obj => {
        if (this.selectedGenre == null) return true
        for (let g of obj.movieGenres) {
          if (g.genre.name === this.selectedGenre) {
            return g.genre.name === this.selectedGenre
          }
        }
        return false
      })
      .filter(obj => {
        if (this.selectedActor == null) return true
        for (let a of obj.movieActors) {
          if (a.actor.name === this.selectedActor) {
            return a.actor.name === this.selectedActor
          }
        }
        return false
      })
      .filter(obj => {
        if (this.selectedProj == null) return true
        return this.utils.formatDate(obj.createdAt) === this.selectedProj
      })
      .filter(obj => {
        if (this.selectedRelease == null) return true
        return this.utils.formatDate(obj.startDate) === this.selectedRelease
      })

    this.generateSearchCriteria(this.dataSource)
  }
}
