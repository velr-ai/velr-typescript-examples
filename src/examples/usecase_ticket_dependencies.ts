import {
  printRows,
  runIfMain,
  withDb
} from "../example-utils.js";

export async function main() {
  await withDb(async (db) => {
    db.run("CREATE (:Ticket {id:'T-1', title:'schema'})<-[:DEPENDS_ON]-(:Ticket {id:'T-2', title:'api'})<-[:DEPENDS_ON]-(:Ticket {id:'T-3', title:'ui'})");
    const rows = db.query<{ ticket: string; blocks: string }>(
      "MATCH (t:Ticket)-[:DEPENDS_ON]->(dep:Ticket) RETURN t.id AS ticket, dep.id AS blocks ORDER BY ticket"
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
