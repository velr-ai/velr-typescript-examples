import {
  printRows,
  runIfMain,
  withDb
} from "../example-utils.js";

export async function main() {
  await withDb(async (db) => {
    db.run("CREATE (:Movie {year:1999}), (:Movie {year:1999}), (:Movie {year:2014})");
    const rows = db.query<{ year: number; count: number }>(
      "MATCH (m:Movie) RETURN m.year AS year, count(m) AS count ORDER BY year",
      { int64: "number" }
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
