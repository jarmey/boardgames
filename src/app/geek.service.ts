import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'text/xml' })
};

@Injectable({
  providedIn: 'root'
})
export class GeekService {

  geekUrl = 'https://cors-anywhere.herokuapp.com/https://www.boardgamegeek.com/xmlapi/search?search=mansions';
  geekCollectionUrl = 'https://cors-anywhere.herokuapp.com/https://www.boardgamegeek.com/xmlapi2/collection?username=izombot';

  getGames() {
    return this.http.get(this.geekCollectionUrl, { responseType: 'text' });
  }

  constructor( private http: HttpClient,) { }
}
