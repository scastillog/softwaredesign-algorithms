import { Shipment } from "src/Shipment";

interface Builder {
  setWeight(w: number): void;
  setFromAddress(s: string): void;
  setFromZipCode(s: string): void;
  setToAddress(s: string): void;
  setToZipCode(s: string): void;
}

export class ClientBuilder implements Builder {
  private shipment: Shipment;

  constructor() {}

  setWeight(w: number) {
    this.shipment.setWeight(w);
  }
  setFromAddress(s: string) {
    this.shipment.setFromAddress(s);
  }
  setFromZipCode(s: string) {
    this.shipment.setFromZipCode(s);
  }
  setToAddress(s: string) {
    this.shipment.setToAddress(s);
  }
  setToZipCode(s: string) {
    this.shipment.setToZipCode(s);
  }

  getShipment() {
    return this.shipment;
  }
}

export class Client {
  private builder: ClientBuilder;

  setBuilder(b: ClientBuilder) {
    this.builder = b;
  }

  makeShipment() {
    this.builder.setWeight(10);
    this.builder.setFromAddress("street doe");
    this.builder.setFromZipCode("11111");
    this.builder.setToAddress("street jhon");
    this.builder.setToZipCode("11121");
  }
}
