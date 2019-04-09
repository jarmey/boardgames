import { Component, OnInit } from '@angular/core';
import { GamesService } from './../games.service';
import { ActivatedRoute } from "@angular/router";
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.sass']
})
export class GameDetailComponent implements OnInit {

  game = {};

  editGameForm: FormGroup;

  formControls = {
    gameName: new FormControl(),
    gameId: new FormControl(),
    gameDescription: new FormControl(),
    gameCategory: new FormControl(),
  };

  constructor(
    private gamesService: GamesService,
    private route: ActivatedRoute,
  ) {}

  getGame() {
    const id = this.route.snapshot.paramMap.get("id");
    this.gamesService.getGameById(id).subscribe(
      details => {
       this.game = details[0];
       this.editGameForm.patchValue({
         gameId: this.game['id'],
         gameName: this.game['name'],
         gameCategory: this.game['category'],
         gameDescription: this.game['description']
       });
      }
    )
  }

  saveGame() {
    const formValues = this.editGameForm.value;
    console.log('formValues: ', formValues);
    this.gamesService.updateGame(formValues)
  }

  ngOnInit() {
    this.editGameForm = new FormGroup(this.formControls);
    this.getGame();
  }

}
