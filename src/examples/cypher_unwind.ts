import {
  printRows,
  runIfMain,
  withDb
} from "../example-utils.js";

export async function main() {
  await withDb(async (db) => {
    const rows = db.query<{ value: number; doubled: number }>(
      "UNWIND [1, 2, 3] AS value RETURN value, value * 2 AS doubled",
      { int64: "number" }
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
