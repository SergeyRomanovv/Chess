import { Colors } from "../Colors";
import logo from '../../assets/black-king.png'
import { Cell } from "../Cell";
import {v4} from 'uuid'

export enum FigureNames {
FIGURE = 'Фигура',
KING = 'Король',
QUEEN = 'Ферзь',
ROOK = 'Ладья',
BISHOP = 'Слон',
KNIGHT = 'Конь',
PAWN = 'Пешка',
}

export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureNames;
  id: string;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.FIGURE
    this.id = v4()
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) {
      return false;
    }
    if (target.figure?.name === FigureNames.KING) {
      return false;
    }
    return true;
  }

  moveFigure(target: Cell) {
    
  }
}
