import { Point } from "./Point";

export abstract class Shape {
  protected color: string;
  protected filled: boolean;
  protected points: Point[];

  constructor(points: Point[]);
  constructor(points: Point[], color: string, filled: boolean);
  constructor(points: Point[], color?: string, filled?: boolean) {
    if (points.length < 3) {
      throw "the Shape should has at least 3 points";
    }

    this.points = points;
    this.color = color ?? "green";
    this.filled = filled ?? true;
  }

  private isFilledToString(): string {
    return this.filled ? "filled" : "not filled";
  }

  private getPointsToString(): string {
    return this.points.map((point) => point.toString()).join(", ");
  }

  public toString(): string {
    return `A Shape with color of ${
      this.color
    } and ${this.isFilledToString()}. Points: ${this.getPointsToString()}.`;
  }

  public getPerimeter() {
    const points = this.points;

    const firstPointPlusLastPoint = points[0].distance(
      points[points.length - 1]
    );

    let result = 0;
    let i = 0;

    while (points[i + 1]) {
      result += points[i].distance(points[i + 1]);
      i++;
    }

    return result + firstPointPlusLastPoint;
  }

  abstract getType(): string;
}
