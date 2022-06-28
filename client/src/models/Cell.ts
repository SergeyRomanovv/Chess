import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";
import {v4} from 'uuid'

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean; // Можно ли переместить
  id: string; // react key

  constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.available = false;
    this.id = v4();
  }

  setFigure(figure: Figure): void {
    this.figure = figure;
    this.figure.cell = this;
  }

  moveFigure(target: Cell) : void {
    if (this.figure && this.figure?.canMove(target)) {
      this.figure?.moveFigure(target);
      target.setFigure(this.figure)
      target.figure = this.figure;
      this.figure = null;
    }
  }


  isEmpty(): boolean {
    return this.figure === null;
  }

  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false;
    }

    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);

    for (let axisY = min + 1; axisY < max; axisY++) {
      if (!this.board.getCell(this.x, axisY).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false;
    }

    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);

    for (let axisX = min + 1; axisX < max; axisX++) {
      if (!this.board.getCell(axisX, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyDiogonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);

    if (absX !== absY) {
      return false;
    }
    const diagonalX = this.x < target.x ? 1 : -1;
    const diagonalY = this.y < target.y ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + diagonalX * i, this.y + diagonalY * i).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEnemy(target: Cell): boolean{
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }
    return false;
  }
}
