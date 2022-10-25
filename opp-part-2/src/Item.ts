import { Comparable } from "./Comparable";

export abstract class Item implements Comparable<Item> {
  static countId: number = 0;
  id: number = 0;
  name: string;
  numberOfItems: number;
  value: number;
  weight: number;

  constructor(name: string, value: number, weight: number) {
    this.id = Item.countId++;
    this.numberOfItems = 0;
    this.name = name;
    this.value = value;
    this.weight = weight;
  }

  abstract use(): void;

  static reset(): void {
    this.countId = 0;
  }

  toString(): string {
    return `${this.name} - Value: ${this.value}, Weight: ${this.weight}`;
  }

  public getId(): number {
    return this.id;
  }
  public getValue(): number {
    return this.value;
  }
  public getName(): string {
    return this.name;
  }
  public getWeight(): string {
    return this.weight.toFixed(2);
  }

  public setName(name: string): void {
    this.name = name;
  }
  public setValue(price: number): void {
    this.value = price;
  }
  public setWeight(weight: number): void {
    this.weight = weight;
  }

  public compareTo(other: Item): number {
    if (this.getValue() > other.getValue()) {
      return 1;
    }
    if (this.getValue() < other.getValue()) {
      return -1;
    }

    return this.getName().localeCompare(other.getName());
  }
}
