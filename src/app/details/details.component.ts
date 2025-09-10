import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { JsonPipe, NgIf } from '@angular/common';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-details',
  imports: [JsonPipe, NgIf, LoadingComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  public movie: MovieModel | null = null

  public constructor(private route: ActivatedRoute, public utils: UtilsService){
    route.params.subscribe(params=>{
      MovieService.getMoviesByShortUrl(params['url'])
        .then(rsp => {
          this.movie = rsp.data
        })
    })
  }
}
