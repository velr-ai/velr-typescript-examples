import {
  printRows,
  runIfMain,
  withDb
} from "../example-utils.js";

export async function main() {
  await withDb(async (db) => {
    db.run("CREATE (:Person:Engineer {name:'Grace', language:'COBOL'})");
    const rows = db.query<{ name: string; language: string }>(
      "MATCH (p:Engineer) RETURN p.name AS name, p.language AS language"
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
