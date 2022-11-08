export abstract class Shipper {
  public costPerOunce: number = 39;

  getCost() {
    return this.costPerOunce;
  }
}

export class AirEastShipper extends Shipper {
  public static ZIP_CODES = ["1", "2", "3"];
  public costPerOunce: number = 39;

  getCost() {
    return this.costPerOunce;
  }
}

export class ChicagoSprintShipper extends Shipper {
  public static ZIP_CODES = ["4", "5", "6"];
  public costPerOunce: number = 42;

  getCost() {
    return this.costPerOunce;
  }
}

export class PacificParcelShipper extends Shipper {
  public static ZIP_CODES = ["7", "8", "9"];
  public costPerOunce: number = 51;

  getCost() {
    return this.costPerOunce;
  }
}

interface ShipperFactoryInterface {
  makeShipper(): Shipper;
}

export class ShipperFactory implements ShipperFactoryInterface {
  fromZipCode: string;

  constructor(fromZipCode: string) {
    this.fromZipCode = fromZipCode;
  }

  public makeShipper(): Shipper {
    if (AirEastShipper.ZIP_CODES.includes(this.fromZipCode.charAt(0))) {
      return new AirEastShipper();
    }

    if (ChicagoSprintShipper.ZIP_CODES.includes(this.fromZipCode.charAt(0))) {
      return new ChicagoSprintShipper();
    }

    if (PacificParcelShipper.ZIP_CODES.includes(this.fromZipCode.charAt(0))) {
      return new PacificParcelShipper();
    }
  }
}
