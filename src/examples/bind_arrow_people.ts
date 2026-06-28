import {
  optionalImport,
  printRows,
  runIfMain,
  withDb
} from "../example-utils.js";

export async function main() {
  const arrow = await optionalImport("apache-arrow", "apache-arrow");
  await withDb(async (db) => {
    const table = arrow.tableFromArrays({ name: ["Ada", "Grace"], born: [1815, 1906] });
    const ipc = arrow.tableToIPC(table, "file");
    db.bindArrowIpc("_people_arrow", Buffer.from(ipc));
    const rows = db.query("UNWIND BIND('_people_arrow') AS row RETURN row.name AS name, row.born AS born ORDER BY born", { int64: "number" });
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
