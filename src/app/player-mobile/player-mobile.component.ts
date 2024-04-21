import { Component, Input } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-player-mobile',
  standalone: true,
  imports: [GameComponent, NgClass],
  templateUrl: './player-mobile.component.html',
  styleUrl: './player-mobile.component.scss'
})
export class PlayerMobileComponent {

  @Input() name: any;
  @Input() image: any;
  @Input() playerActive: boolean = false;
}
