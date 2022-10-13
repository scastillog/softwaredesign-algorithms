export class Point {
  private x: number = 0;
  private y: number = 0;

  constructor();
  constructor(x: number, y: number);
  constructor(x?: number, y?: number) {
    if (typeof x === "number" && typeof y === "number") {
      this.x = x;
      this.y = y;
      return;
    }
  }

  private calculateDistance(x1, y1): number {
    const a = x1 - this.x;
    const b = y1 - this.y;
    return Math.sqrt(a * a + b * b);
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  public distance(): number;
  public distance(point: Point): number;
  public distance(x: number, y: number): number;
  public distance(xOrPoint?: number | Point, y?: number): number {
    if (typeof xOrPoint === "number" && typeof y === "number") {
      return this.calculateDistance(xOrPoint, y);
    }

    if (xOrPoint instanceof Point) {
      return this.calculateDistance(xOrPoint.getX(), xOrPoint.getY());
    }

    return this.calculateDistance(0, 0);
  }
}
