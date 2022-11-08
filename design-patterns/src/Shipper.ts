interface GetCost {
  getCostByLetter(): number;
  getCostByPackage(): number;
  getCostByOversize(w?: number): number;
}

export abstract class Shipper implements GetCost {
  public costPerOunce: number = 39;

  getCost() {
    return this.costPerOunce;
  }

  getCostByLetter(): number {
    return 0.39;
  }
  getCostByPackage(): number {
    return 0.25;
  }
  getCostByOversize(w?: number): number {
    return 10 + 0.25 * w;
  }
}

export class AirEastShipper extends Shipper implements GetCost {
  public static ZIP_CODES = ["1", "2", "3"];
  public costPerOunce: number = 39;

  getCost() {
    return this.costPerOunce;
  }
  getCostByLetter(): number {
    return 0.39;
  }
  getCostByPackage(): number {
    return 0.25;
  }
  getCostByOversize(): number {
    return 10 + 0.25;
  }
}

export class ChicagoSprintShipper extends Shipper implements GetCost {
  public static ZIP_CODES = ["4", "5", "6"];
  public costPerOunce: number = 42;

  getCost() {
    return this.costPerOunce;
  }
  getCostByLetter(): number {
    return 0.43;
  }
  getCostByPackage(): number {
    return 0.2;
  }
  getCostByOversize(): number {
    return 0.2;
  }
}

export class PacificParcelShipper extends Shipper {
  public static ZIP_CODES = ["7", "8", "9"];
  public costPerOunce: number = 51;

  getCost() {
    return this.costPerOunce;
  }

  getCostByLetter(): number {
    return 0.51;
  }
  getCostByPackage(): number {
    return 0.19;
  }
  getCostByOversize(w: number): number {
    return 0.19 + w * 0.02;
  }
}

interface ShipperFactoryInterface {
  makeShipper(fromZipCode: string): Shipper;
}

export class ShipperFactory implements ShipperFactoryInterface {
  public makeShipper(fromZipCode: string): Shipper {
    if (AirEastShipper.ZIP_CODES.includes(fromZipCode.charAt(0))) {
      return new AirEastShipper();
    }

    if (ChicagoSprintShipper.ZIP_CODES.includes(fromZipCode.charAt(0))) {
      return new ChicagoSprintShipper();
    }

    if (PacificParcelShipper.ZIP_CODES.includes(fromZipCode.charAt(0))) {
      return new PacificParcelShipper();
    }
  }
}
