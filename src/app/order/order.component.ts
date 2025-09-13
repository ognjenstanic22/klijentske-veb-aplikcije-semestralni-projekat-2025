import { Component } from '@angular/core';
import { MovieModel } from '../../models/movie.model';
import { MovieGenreModel } from '../../models/movieGenre.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { MovieService } from '../../services/movie.service';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  imports: [MatCardModule, NgIf, MatInputModule, MatButtonModule, MatSelectModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  public movie: MovieModel | null = null
  public selectedTicketCount: number = 1
  public moviePrice: number = 1

  public constructor(private route: ActivatedRoute, public utils: UtilsService, private router: Router) {
    route.params.subscribe(params => {
      MovieService.getMoviesByShortUrl(params['url'])
        .then(rsp => {
          this.movie = rsp.data
          this.moviePrice = utils.generateMoviePrice(rsp.data.runTime)
        })
    })
  }

  public doOrder() {
    const result = UserService.createOrder({
      id: new Date().getTime(),
      shortUrl: this.movie!.shortUrl,
      title: this.movie!.title,
      shortDescription: this.movie!.shortDescription,
      runTime: this.movie!.runTime,
      movieGenres: this.movie!.movieGenres,
      director: this.movie!.director,
      movieActors: this.movie!.movieActors,
      createdAt: this.movie!.createdAt,
      startDate: this.movie!.startDate,
      count: this.selectedTicketCount,
      pricePerItem: this.moviePrice,
      status: 'rezervisano',
      rating: null
    })

    result ? this.router.navigate(['/user']) : alert('Desila se greska prilikom rezervisanja!')
  }

}
