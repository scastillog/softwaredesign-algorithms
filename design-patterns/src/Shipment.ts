import { ShipperFactory, Shipper } from "src/Shipper";

export abstract class Shipment {
  public static countId: number = 0;
  private static costPerOunce: number = 39;

  public shipper: Shipper;

  protected weight: number; // ounces
  public shipmentId: number = 0;
  public fromAddress: string;
  public fromZipCode: string;
  public toAddress: string;
  public toZipCode: string;

  constructor() {
    this.shipmentId = Shipment.countId++;
    this.shipper = new ShipperFactory().makeShipper(this.fromZipCode);
  }

  getCost() {
    return this.weight * Shipment.costPerOunce;
  }

  getShipmentId() {
    return this.shipmentId;
  }

  public ship() {
    return `shipping ${this.getShipmentId}, sent from ${this.fromAddress} to ${this.toAddress} with this cost: ${this.getCost}`;
  }

  setWeight(w: number) {
    this.weight = w;
  }

  setFromAddress(fromAddress: string) {
    this.fromAddress = fromAddress;
  }

  setFromZipCode(fromZipCode: string) {
    this.fromZipCode = fromZipCode;
  }

  setToAddress(toAddress: string) {
    this.toAddress = toAddress;
  }

  setToZipCode(toZipCode: string) {
    this.toZipCode = toZipCode;
  }

  getFromAddress() {
    return this.fromAddress;
  }

  getFromZipCode() {
    return this.fromZipCode;
  }

  getToAddress() {
    return this.toAddress;
  }

  getToZipCode() {
    return this.toZipCode;
  }
}

interface Strategy {
  getCostByShipment(weight: number): number;
}

export class Letter extends Shipment implements Strategy {
  getCostByShipment(weight: number): number {
    return this.shipper.getCostByLetter() * weight;
  }
}

export class Package extends Shipment {
  getCostByShipment(weight: number): number {
    return this.shipper.getCostByPackage() * weight;
  }
}

export class Oversize extends Shipment {
  getCostByShipment(weight: number): number {
    return this.shipper.getCostByOversize(weight);
  }
}
