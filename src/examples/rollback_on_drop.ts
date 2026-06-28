import {
  printRows,
  runIfMain,
  withDb
} from "../example-utils.js";

export async function main() {
  await withDb(async (db) => {
    const tx = db.beginTx();
    tx.run("CREATE (:Event {name:'rolled back on close'})");
    tx.close();

    const rows = db.query<{ count: number }>(
      "MATCH (e:Event) RETURN count(e) AS count",
      { int64: "number" }
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
