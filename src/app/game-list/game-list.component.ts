import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import {FormControl, FormGroup} from '@angular/forms'
import {Observable} from 'rxjs';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.sass']
})
export class GameListComponent implements OnInit {

  gameList;

  addGameForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl('')
  });

  onSubmit() {
    this.addGame(this.addGameForm.value);
  }

  getGames() {
    this.gamesService.getGames()
      .subscribe(
        gameList => {
          this.gameList = gameList;
        }
      );
    return this.gameList;
  }

  addGame(game) {
    if (!game) { return; }
    this.gamesService.addGame(game)
      .subscribe(
        data => {
        this.gameList.push(data);
      });
  }

  constructor(private gamesService: GamesService) {}

  ngOnInit() {
    this.getGames();
  }

}
