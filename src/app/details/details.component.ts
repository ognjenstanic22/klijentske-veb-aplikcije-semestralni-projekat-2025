import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import {  NgFor, NgIf } from '@angular/common';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from "../loading/loading.component";
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-details',
  imports: [NgIf, NgFor, LoadingComponent, MatCardModule, MatButtonModule, MatListModule, RouterLink, MatIconModule],
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
