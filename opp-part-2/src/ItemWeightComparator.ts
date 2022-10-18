import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class ItemWeightComparator implements ItemComparator {
  public compare(first: Item, second: Item) {
    if (parseFloat(first.getWeight()) > parseFloat(second.getWeight())) {
      return 1;
    }
    if (parseFloat(first.getWeight()) < parseFloat(second.getWeight())) {
      return -1;
    }
    return first.compareTo(second);
  }
}
