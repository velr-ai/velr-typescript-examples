import {
  MOVIES_CREATE,
  runIfMain,
  withDb
} from "../example-utils.js";

export async function main() {
  await withDb(async (db) => {
    db.run(MOVIES_CREATE);
    const table = db.execOne("MATCH (m:Movie) RETURN m.title AS title, m.released AS released ORDER BY released");
  try {
    const arrowTable = await table.toArrowTable();
    console.log(String(arrowTable));
  } finally {
      table.close();
    }
  });
}

runIfMain(import.meta.url, main);
