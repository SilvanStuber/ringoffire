import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
} from '@angular/fire/firestore';
import { Game } from './../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  firestore: Firestore = inject(Firestore);
  items$;
  items;
  constructor() {
    this.items$ = collectionData(this.getGameRef());
    this.items = this.items$.subscribe((game) => {
      game.forEach((element) => {
      });
    });
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  async addGame(game: Game) {
    await addDoc(this.getGameRef(), game.toJson());
  }
}
