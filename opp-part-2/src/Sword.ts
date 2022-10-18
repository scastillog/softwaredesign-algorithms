import { Weapon } from "./Weapon";

export class Sword extends Weapon {
  constructor(
    baseDamage: number,
    baseDurability: number,
    value: number,
    weight: number
  ) {
    super("sword", baseDamage, baseDurability, value, weight);
  }

  polish(): void {
    if (this.getDamageModifier() === this.getBaseDamage() * 0.25) {
      return;
    }

    this.setDamageModifier(
      this.getDamageModifier() + Weapon.MODIFIER_CHANGE_RATE
    );
  }
}
