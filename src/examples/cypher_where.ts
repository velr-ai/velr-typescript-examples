import {
  printRows,
  runIfMain,
  withDb
} from "../example-utils.js";

export async function main() {
  await withDb(async (db) => {
    db.run("CREATE (:Person {name:'Ada', born:1815}), (:Person {name:'Grace', born:1906})");
    const rows = db.query<{ name: string; born: number }>(
      "MATCH (p:Person) WHERE p.born >= $year RETURN p.name AS name, p.born AS born ORDER BY born",
      { params: { year: 1900 }, int64: "number" }
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
