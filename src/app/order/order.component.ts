import { Component } from '@angular/core';
import { MovieModel } from '../../models/movie.model';
import { MovieGenreModel } from '../../models/movieGenre.model';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { MovieService } from '../../services/movie.service';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-order',
  imports: [MatCardModule, NgIf, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  public movie: MovieModel | null = null
  public allGenres: MovieGenreModel[] | null = null

  public constructor(private route: ActivatedRoute, public utils: UtilsService){
    route.params.subscribe(params=>{
      MovieService.getMoviesByShortUrl(params['url'])
        .then(rsp => {
          this.movie = rsp.data
          this.allGenres = rsp.data.movieGenres
        })
    })
  }

  public doOrder(){
    const result = UserService.createOrder
  }

}
