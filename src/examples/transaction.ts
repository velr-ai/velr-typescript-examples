import {
  printRows,
  runIfMain,
  withDb
} from "../example-utils.js";

export async function main() {
  await withDb(async (db) => {
    db.transaction((tx) => {
      tx.run("CREATE (:Event {name:'launch'})");
    });

    const rows = db.query<{ name: string }>(
      "MATCH (e:Event) RETURN e.name AS name"
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
