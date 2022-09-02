import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlPokeName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: any;
  public isLoading: boolean = true;
  public apiError: boolean = false;

  constructor(
    private activatedRouter: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) {}

  ngOnInit(): void {
    this.getPokemon;
  }

  get getPokemon() {
    const id = this.activatedRouter.snapshot.params['id'];
    const pokemon = this.pokeApiService.apiGetPokemons(
      `${this.urlPokemon}/${id}`
    );
    const name = this.pokeApiService.apiGetPokemons(
      `${this.urlPokeName}/${id}`
    );

    return forkJoin([pokemon, name]).subscribe({
      next: (response) => {
        this.pokemon = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.apiError = true;
      },
    });
  }
}
