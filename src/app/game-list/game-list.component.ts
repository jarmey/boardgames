import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { GeekService } from '../geek.service';
import { FormControl, FormGroup } from '@angular/forms'
import { GeekJson } from '../process-geek-json'
import {Observable} from 'rxjs';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.sass']
})
export class GameListComponent implements OnInit {

  gameList;
  geekGameList;
  geekGameList2;

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

  geekCollection () {
    let parseString = require('xml2js').parseString;
    this.geekService.getGames()
      .subscribe(
        data => {
          let list = null;
          parseString(data, function (err, result) {
            console.log(result);
            list = result;
          });
          this.geekGameList = list;
          this.geekGameList2 = GeekJson(list);
          //console.log('geek game list: ', this.geekGameList);
          console.log('geek geek json: ', this.geekGameList2);
        });
  }

  // PROCESS BGG COLLECTIONS
  // 1. get collection from bgg
  // 2. create object of collection
  // 3. for each item in collection (!exists in games table) query bgg and send results to backend to insert


  constructor(
    private gamesService: GamesService,
    private geekService: GeekService,
  ) {}

  ngOnInit() {
    this.getGames();
    this.geekCollection();
  }

}
