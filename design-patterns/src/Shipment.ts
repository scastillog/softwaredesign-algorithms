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

const MARK_FRAGILE = "**MARK FRAGILE** \n";
const MARK_IMPORTANT = "**MARK DO NOT LEAVE IF ADDRESS NOT AT HOME** \n";
const MARK_RECIPT = "**MARK RETURN RECEIPT REQUESTED** \n";
export class ShipmentDecorator extends Shipment {
  protected shipment: Shipment;
  isFragile: boolean = false;
  isImportant: boolean = false;
  needRecipt: boolean = false;

  constructor(shipment: Shipment) {
    super();
    this.shipment = shipment;
  }

  setFragile() {
    this.isFragile = true;
  }

  setImportant() {
    this.isImportant = true;
  }

  setNeedRecipt() {
    this.needRecipt = true;
  }

  public ship(): string {
    const fragileString = this.isFragile && MARK_FRAGILE;
    const importantString = this.isImportant && MARK_IMPORTANT;
    const receiptString = this.needRecipt && MARK_RECIPT;
    return (
      `${this.shipment.ship()}\n` +
      fragileString +
      importantString +
      receiptString
    );
  }
}
