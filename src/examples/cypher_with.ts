import {
  MOVIES_CREATE,
  printRows,
  runIfMain,
  withDb
} from "../example-utils.js";

export async function main() {
  await withDb(async (db) => {
    db.run(MOVIES_CREATE);
    const rows = db.query<{ decade: number; title: string }>(
      "MATCH (m:Movie) WITH m, floor(m.released / 10) * 10 AS decade RETURN decade, m.title AS title ORDER BY decade, title",
      { int64: "number" }
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
