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
import { DirectorModel } from '../../models/director.model';

@Component({
  selector: 'app-search',
  imports: [
    MatTableModule,
    NgIf,
    NgFor,
    MatButtonModule,
    LoadingComponent,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  displayedColumns: string[] = ['movieId', 'title', 'runTime', 'director.name', 'price', 'actions'];
  allData: MovieModel[] | null = null
  dataSource: MovieModel[] | null = null
  directors: DirectorModel[] = []
  selectedDirector: string | null = ''
  runtimeList: number[] | null = null
  selectedRuntime: number | null = null
  userInput: string = ''
  priceList: number[] | null = null
  selectedPrice: number | null = null

  public constructor(public utils: UtilsService) {
    MovieService.getMovies()
      .then(rsp => {
        this.allData = rsp.data
        this.dataSource = rsp.data
        this.directors = rsp.data.map((obj: MovieModel) => obj.director)
        this.runtimeList = rsp.data.map((obj: MovieModel) => obj.runTime)
        this.priceList = rsp.data.map((obj: MovieModel) => utils.generateMoviePrice(obj.runTime))
      })
  }

  public doSearch(e: any) {
    if (this.allData == null) return

    if (this.userInput == '') {
      this.dataSource = this.allData
      return
    }

    this.dataSource = this.allData.filter(obj => {
      return obj.title.includes(this.userInput) ||
        obj.runTime.toString().includes(this.userInput) ||
        obj.director.name.includes(this.userInput)
    })
  }

  public doReset() {
    this.userInput = ''
    this.selectedDirector = null
    this.selectedRuntime = null
    this.selectedPrice = null
    this.dataSource = this.allData
  }

  public doFilterChain(){
     this.dataSource = this.allData!
     .filter(obj => {
      if(this.selectedDirector == null) return true
      return obj.director.name === this.selectedDirector
     })
     .filter(obj => {
      if(this.selectedRuntime == null) return true
      return obj.runTime === this.selectedRuntime
     })
     .filter(obj => {
      if(this.selectedPrice == null) return true
      return this.utils.generateMoviePrice(obj.runTime) === this.selectedPrice
     })
  }
}
