import { Component, Input } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [GameComponent, NgClass],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  @Input() name: any;
  @Input() image = '1.png';
  @Input() playerActive: boolean = false;

}
