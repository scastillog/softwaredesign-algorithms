import { Client, ClientBuilder } from "src/Client";
import { Letter } from "src/Shipment";

const builder = new ClientBuilder(new Letter());

const client = new Client();

client.setBuilder(builder);
client.makeShipment();

console.log(client);
