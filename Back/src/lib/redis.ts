import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

//https://github.com/redis/redis-om-node#a-note-for-typescript-users
class Player extends Entity {}
let schema = new Schema(
  Player,
  {
    word: { type: "string" },
    tries: { type: "number" },
  },
  {
    dataStructure: "JSON",
  }
);

export async function createPlayer(data: any) {
  await connect();

  const repository = new Repository(schema, client);

  const player: Player = repository.createEntity(data);

  const id: string = await repository.save(player);
}

export async function getPlayer(id: string) {
  await connect();

  const repository = new Repository(schema, client);

  const player = await repository.fetch(id);

  return player;
}
