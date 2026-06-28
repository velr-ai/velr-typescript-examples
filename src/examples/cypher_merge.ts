import {
  printRows,
  runIfMain,
  withDb
} from "../example-utils.js";

export async function main() {
  await withDb(async (db) => {
    db.run("MERGE (:Topic {name:'graphs'})");
    db.run("MERGE (:Topic {name:'graphs'})");
    const rows = db.query<{ count: number }>(
      "MATCH (t:Topic {name:'graphs'}) RETURN count(t) AS count",
      { int64: "number" }
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
