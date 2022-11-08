export class Shipment {
  private static shipment: Shipment;
  private static countId: number = 0;
  private static costPerOunce: number = 39;

  private shipmentId: number = 0;
  private weight: number; // ounces
  public fromAddress: string;
  public fromZipCode: string;
  public toAddress: string;
  public toZipCode: string;

  private constructor() {
    this.shipmentId = Shipment.countId++;
  }

  public static getInstance(): Shipment {
    if (!Shipment.shipment) {
      Shipment.shipment = new Shipment();
    }

    return Shipment.shipment;
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
