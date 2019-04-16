import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { GeekService } from '../geek.service';
import { FormControl, FormGroup } from '@angular/forms'
import { GeekJson } from '../process-geek-json'

@Component({
  selector: 'app-recommend-games',
  templateUrl: './recommend-games.component.html',
  styleUrls: ['./recommend-games.component.sass']
})
export class RecommendGamesComponent implements OnInit {

  constructor(
    private geekService: GeekService,
    private gamesService: GamesService
  ) { }

  geekGameList;
  gameUpdateList = [];

  geekCollection () {
    let parseString = require('xml2js').parseString;
    this.geekService.getGames()
      .subscribe(
        data => {
          let list = null;
          parseString(data, function (err, result) {
            list = result;
          });
        this.geekGameList = GeekJson(list);
        this.getInsertList();
        });
  }

  //geekList = [{'geekId' : '1'},{'geekId' : '2'}];

  getInsertList() {
    //for (let game of collection) {
      this.gamesService.checkIfExists([1,2,3])
          .subscribe(
            gameList => {
              //this.gameUpdateList.push(gameList);
              console.log('buildinsert gamelist', gameList);
            },
          );
    //}
    //return this.gameUpdateList;
  }

  ngOnInit() {
    //this.buildInsertList(this.geekList);
    //this.geekCollection();
  }

}
