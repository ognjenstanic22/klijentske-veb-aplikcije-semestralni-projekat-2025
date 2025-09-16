import { Component } from '@angular/core';
import { MovieModel } from '../../models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { MovieService } from '../../services/movie.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  imports: [MatCardModule, NgIf, MatInputModule, MatButtonModule, MatSelectModule, FormsModule, NgFor, NgIf],
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
    if (UserService.getActiveUser()) {
      Swal.fire({
        title: `Rezervacija: ${this.movie?.title}`,
        text: "Rezervisati? Uvek možete prekinuti rezervaciju na vašem profilu!",
        icon: "warning",
        showCancelButton: true,
        customClass: {
          popup: 'bg-dark'
        },
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Da"
      }).then((result) => {
        if (result.isConfirmed) {
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
          Swal.fire({
            title: "Rezervisano!",
            text: "Vaša rezervacija je zabeležena!",
            icon: "success",
            customClass: {
              popup: 'bg-dark'
            }
          });
          this.router.navigate(['/user'])
        } else {
          Swal.fire({
            title: "Prekinuta rezervacija!",
            text: "Vaša rezervacija je prekinuta!",
            icon: "error",
            customClass: {
              popup: 'bg-dark'
            }
          });
        }
      });
    } else {
      Swal.fire({
        text: "Molimo, ulogujte se da bi rezervisali film!",
        customClass: {
          popup: 'bg-dark'
        },
      });
    }
  }
}
