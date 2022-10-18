import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class Inventory {
  private items: Item[] = [];

  addItem(item: Item): void {
    this.items.push(item);
  }

  sort(): void;
  sort(comparator: ItemComparator): void;
  sort(comparator?: ItemComparator): void {
    if (comparator) {
      this.items.sort(comparator.compare);
      return;
    }

    this.items.sort((a, b) => {
      return b.getValue() - a.getValue();
    });
  }

  toString(): string {
    return this.items.join(", ");
  }
}
