import { Item } from "./Item";

export abstract class Consumable extends Item {
  private consumed: Boolean;
  private spoiled: Boolean;

  constructor(name: string, value: number, weight: number, spoiled: boolean) {
    super(name, value, weight);
    this.spoiled = spoiled;
    this.consumed = false;
  }

  isConsumed(): Boolean {
    return this.consumed;
  }

  setConsumed(consumed: Boolean): void {
    this.consumed = consumed;
  }

  use(): string {
    if (!this.isConsumed() && !this.spoiled) {
      this.setConsumed(true);
      return this.eat();
    }

    if (this.isConsumed()) {
      return `There is nothing left of the ${this.getName()} to consume.`;
    }

    return "";
  }

  eat(): string {
    if (this.spoiled) {
      return `You eat the ${(this, this.getName())} \n You feel sick.`;
    }

    return `You eat the ${this.getName()}`;
  }
}
