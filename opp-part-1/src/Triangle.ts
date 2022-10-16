import { Point } from "./Point";
import { Shape } from "./Shape";

const enum TypesTriangles {
  EQUILATERAL = "equilateral triangle",
  ISOSCELES = "isosceles triangle",
  SCALENE = "scalene triangle",
}

export class Triangle extends Shape {
  private side1: string;
  private side2: string;
  private side3: string;

  constructor(p1: Point, p2: Point, p3: Point);
  constructor(p1: Point, p2: Point, p3: Point, color: string, filled: boolean);
  constructor(
    p1: Point,
    p2: Point,
    p3: Point,
    color?: string,
    filled?: boolean
  ) {
    super([p1, p2, p3], color, filled);

    this.side1 = p1.distance(p2).toFixed(2);
    this.side2 = p2.distance(p3).toFixed(2);
    this.side3 = p3.distance(p1).toFixed(2);
  }

  private isEquilateral() {
    return this.side1 === this.side2 && this.side1 === this.side3;
  }

  private isIsosceles() {
    return (
      this.side1 === this.side2 ||
      this.side2 === this.side3 ||
      this.side1 === this.side3
    );
  }

  public toString(): string {
    return `Triangle[v1=${this.points[0].toString()},v2=${this.points[1].toString()},v3=${this.points[2].toString()}]`;
  }

  public getType(): string {
    if (this.isEquilateral()) {
      return TypesTriangles.EQUILATERAL;
    }

    if (this.isIsosceles()) {
      return TypesTriangles.ISOSCELES;
    }

    return TypesTriangles.SCALENE;
  }
}
