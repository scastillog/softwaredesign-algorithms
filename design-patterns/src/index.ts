import { Client, ClientBuilder } from "src/Client";

const builder = new ClientBuilder();

const client = new Client();

client.setBuilder(builder);
client.makeShipment();

console.log(client);
