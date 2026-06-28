import {
  printRows,
  runIfMain,
  withDb
} from "../example-utils.js";

export async function main() {
  await withDb(async (db) => {
    db.run("CREATE (:Person {name:'Ada'})-[:MENTORED]->(:Person {name:'Charles'})");
    const rows = db.query<{ mentor: string; learner: string }>(
      "MATCH (a:Person)-[:MENTORED]->(b:Person) RETURN a.name AS mentor, b.name AS learner"
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
