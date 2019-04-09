import { Injectable } from '@angular/core';
//import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})

export class GamesService {

  getGames() {
    return this.http.get<any[]>(this.gamesUrl);
  }

  getGameById(id) {
    return this.http.get<any[]>(this.gamesUrl+'?id='+id);
  }


  addGame(datas) {
    this.http.post("http://www.beckyandjoel.com/boardgames/api/add-game.php", datas)
      .subscribe(
        data  => {console.log("POST Request is successful ", data);},
        error  => {
          console.log("Error", error);
        }
      );
      return of(datas);
  }

  updateGame(datas) {
    this.http.patch("http://www.beckyandjoel.com/boardgames/api/update-game.php", datas)
      .subscribe(
        data  => {console.log("POST Request is successful ", data);},
        error  => {
          console.log("Error", error);
        }
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      //TODO: send the error to remote logging infrastructure
      console.error(error); //log to console instead

      //Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //private heroesUrl = 'api/heroes'; // URL to web api
  private gamesUrl = 'http://www.beckyandjoel.com/boardgames/api/list-games.php';

  constructor(
    private http: HttpClient,
  ) {}
}
