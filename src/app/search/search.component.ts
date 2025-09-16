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
  directors: string[] = []
  selectedDirector: string | null = ''
  runtimeList: number[] | null = null
  selectedRuntime: number | null = null
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
  }

  public generateSearchCriteria(source: MovieModel[]) {
    this.directors = source.map((obj: MovieModel) => obj.director.name)
      .filter((director: string, i: number, arr: any[]) => arr.indexOf(director) === i)
    this.runtimeList = source.map((obj: MovieModel) => obj.runTime)
    .filter((runtime: number, i: number, arr: any[]) => arr.indexOf(runtime) === i)
  }

  public doReset() {
    this.userInput = ''
    this.selectedDirector = null
    this.selectedRuntime = null
    this.dataSource = this.allData
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

      this.generateSearchCriteria(this.dataSource)
  }
}
