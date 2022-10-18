import { Weapon } from "./Weapon";

export class Bow extends Weapon {
  constructor(
    baseDamage: number,
    baseDurability: number,
    value: number,
    weight: number
  ) {
    super("bow", baseDamage, baseDurability, value, weight);
  }

  polish(): void {
    if (parseFloat(this.getDurability()) > 1) {
      return;
    }
    this.setDurabilityModifier(
      this.getDurabilityModifier() + Weapon.MODIFIER_CHANGE_RATE
    );
  }
}
