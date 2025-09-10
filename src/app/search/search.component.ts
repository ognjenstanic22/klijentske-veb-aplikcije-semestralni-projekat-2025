import { NgIf, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { LoadingComponent } from "../loading/loading.component";
import { RouterLink } from '@angular/router';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-search',
  imports: [MatTableModule, NgIf, MatButtonModule, LoadingComponent, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  displayedColumns: string[] = ['movieId', 'title', 'runTime', 'director.name', 'price', 'actions'];
  dataSource: MovieModel[] | null = null

  public constructor(public utils: UtilsService){
    MovieService.getMovies()
      .then(rsp => this.dataSource = rsp.data)
  }
}
