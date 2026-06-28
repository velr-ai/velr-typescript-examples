import {
  printRows,
  runIfMain,
  withDb
} from "../example-utils.js";

export async function main() {
  await withDb(async (db) => {
    db.run("MERGE (a:Person {name:'Ada'}) MERGE (b:Person {name:'Grace'}) MERGE (a)-[:KNOWS]->(b)");
    const rows = db.query<{ from: string; to: string }>(
      "MATCH (a:Person)-[:KNOWS]->(b:Person) RETURN a.name AS from, b.name AS to"
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
