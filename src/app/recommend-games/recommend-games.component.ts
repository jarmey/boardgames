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
        console.log('geekGameList: ', this.geekGameList);
        console.log('these game ids will be added!', this.buildInsertList(list))
        });
  }

  geekList = [{'geekId' : '1'},{'geekId' : '2'}];

  buildInsertList(collection) {
    for (let game of collection) {
      this.gamesService.getGameById(game['geekId'])
          .subscribe(
            gameList => {
              this.gameUpdateList.push(gameList['geekId']);
              //this.gameUpdateList.push('1');
              console.log('buildinsert', this.gameUpdateList);
              console.log('buildinsert gamelist', gameList);
              console.log('collection: ', collection);
            },
          );
    }
    return this.gameUpdateList;
  }

  ngOnInit() {
    this.buildInsertList(this.geekList);
  }

}
