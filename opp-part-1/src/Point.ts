interface PointsToDistance {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export class Point {
  private x: number;
  private y: number;

  constructor();
  constructor(x: number, y: number);
  constructor(x?: unknown, y?: unknown) {
    if (typeof x === "number" && typeof y === "number") {
      this.x = x;
      this.y = y;
      return;
    }
    this.x = 0;
    this.y = 0;
  }

  private calculateDistance({ x1, y1, x2, y2 }: PointsToDistance): number {
    const a = x1 - x2;
    const b = y1 - y2;
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
  public distance(x?: unknown, y?: unknown): number {
    if (typeof x === "number" && typeof y === "number") {
      return this.calculateDistance({
        x1: this.x,
        y1: this.y,
        x2: x,
        y2: y,
      });
    }

    if (x instanceof Point) {
      return this.calculateDistance({
        x1: this.x,
        y1: this.y,
        x2: x.getX(),
        y2: x.getY(),
      });
    }

    return this.calculateDistance({ x1: this.x, y1: this.y, x2: 0, y2: 0 });
  }
}
