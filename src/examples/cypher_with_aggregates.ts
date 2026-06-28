import {
  MOVIES_CREATE,
  printRows,
  runIfMain,
  withDb
} from "../example-utils.js";

export async function main() {
  await withDb(async (db) => {
    db.run(MOVIES_CREATE);
    const rows = db.query<{ decade: number; count: number }>(
      "MATCH (m:Movie) WITH floor(m.released / 10) * 10 AS decade, count(m) AS count RETURN decade, count ORDER BY decade",
      { int64: "number" }
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
