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
  directors: DirectorModel[] = []
  selectedDirector: string | null = ''
  dataSource: MovieModel[] | null = null

  public constructor(public utils: UtilsService) {
    MovieService.getMovies()
      .then(rsp => {
        this.allData = rsp.data
        this.dataSource = rsp.data
        this.directors = rsp.data.map((obj: MovieModel) => obj.director)
      })
  }

  public doSearch(e: any) {
    const input = e.target.value

    if (this.allData == null) return

    if (input == '') {
      this.dataSource = this.allData
      return
    }

    this.dataSource = this.allData.filter(obj => {
      return obj.title.includes(input) ||
        obj.runTime.toString().includes(input) ||
        obj.director.name.includes(input)
    })
  }

  public doSelectDirector(e: any){
    this.dataSource = this.allData!.filter( obj => obj.director.name == this.selectedDirector)
  }
}
