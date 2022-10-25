import { Consumable } from "./Consumable";

export class Pizza extends Consumable {
  private numberOfSlices: number;
  private slicesEaten: number = 0;
  constructor(
    value: number,
    weight: number,
    numberOfSlices: number,
    spoiled: boolean
  ) {
    super("pizza", value, weight, spoiled);
    this.numberOfSlices = numberOfSlices;
  }

  eat(): string {
    if (this.slicesEaten < this.numberOfItems) {
      this.slicesEaten++;

      if (this.slicesEaten >= this.numberOfSlices) {
        this.setConsumed(true);
      }

      return "You eat a slice of pizza.";
    }

    return "";
  }
}
