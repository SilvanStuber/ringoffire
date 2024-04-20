import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import {
  Firestore,
  collection,
  docData,
  addDoc,
  doc,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    GameInfoComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game();
  firestore: Firestore = inject(Firestore);
  items$;
  items;
  parmsId: string = '';
  gameData: undefined;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.route.params.subscribe((params: any) => {
      this.parmsId = params.id;
    });
    this.items$ = docData(this.getDataGameRef(this.parmsId));
    this.items = this.items$.subscribe((game: any) => {
      console.log("Update game", game)
      this.game.currentPlayer = game.currentPlayer;
      this.game.playedCards = game.playedCards;
      this.game.players = game.players;
      this.game.stack = game.stack;      
    });
  }

  ngOnInit(): void {
    this.newGame();
   
  }

  newGame() {
    this.game = new Game();
    //this.addGame();
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  getDataGameRef(id: string) {
    return doc(collection(this.firestore, 'games'), id);
  }

  async addGame() {
    await addDoc(this.getGameRef(), this.game.toJson());
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || '';
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        if (this.currentCard !== undefined) {
          this.game.playedCards.push(this.currentCard);
          this.pickCardAnimation = false;
        }
      }, 1500);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
