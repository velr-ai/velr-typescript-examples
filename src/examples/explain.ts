import {
  runIfMain,
  withDb
} from "../example-utils.js";

export async function main() {
  await withDb(async (db) => {
    db.run("CREATE (:Movie {title:'Interstellar'})");
    const trace = db.explain("MATCH (m:Movie) RETURN m.title AS title");
    try {
      console.log(JSON.stringify(trace.snapshot(), null, 2));
    } finally {
      trace.close();
    }
  });
}

runIfMain(import.meta.url, main);
