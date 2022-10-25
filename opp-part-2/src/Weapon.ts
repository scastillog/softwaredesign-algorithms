import { Item } from "./Item";

export abstract class Weapon extends Item {
  static MODIFIER_CHANGE_RATE: number = 0.05;
  private baseDamage: number;
  private baseDurability: number;
  private damageModifier: number = 0;
  private durabilityModifier: number = 0;

  constructor(
    name: string,
    baseDamage: number,
    baseDurability: number,
    value: number,
    weight: number
  ) {
    super(name, value, weight);
    this.baseDamage = baseDamage;
    this.baseDurability = baseDurability;
  }

  use(): string {
    if (parseFloat(this.getDurability()) <= 0) {
      return `You can't use the ${this.getName()}, it is broken.`;
    }

    this.baseDurability =
      parseFloat(this.getDurability()) - Weapon.MODIFIER_CHANGE_RATE;

    if (parseFloat(this.getDurability()) <= 0) {
      return `You use the ${this.getName()}, dealing ${this.getDamage()} points of damage. The ${this.getName()} breaks.`;
    }

    return `You use the ${this.getName()}, dealing ${this.getDamage()} points of damage`;
  }

  abstract polish(): void;

  getDamage(): string {
    return (this.baseDamage + this.damageModifier).toFixed(2);
  }

  getDurability(): string {
    return (this.baseDurability + this.durabilityModifier).toFixed(2);
  }

  toString(): string {
    return `${this.getName()} - Value: ${this.getValue()}, Weight: ${this.getWeight()}, Damage: ${this.getDamage()}, Durability: ${this.getDurability()}`;
  }

  getBaseDamage(): number {
    return this.baseDamage;
  }

  getBaseDurability(): number {
    return this.baseDurability;
  }

  getDamageModifier(): number {
    return this.damageModifier;
  }

  getDurabilityModifier(): number {
    return this.durabilityModifier;
  }

  setBaseDamage(baseDamage: number) {
    this.baseDamage = baseDamage;
  }

  setBaseDurability(baseDurability: number) {
    this.baseDurability = baseDurability;
  }

  setDamageModifier(damageModifier: number) {
    this.damageModifier = damageModifier;
  }

  setDurabilityModifier(durabilityModifier: number) {
    this.durabilityModifier = durabilityModifier;
  }
}
