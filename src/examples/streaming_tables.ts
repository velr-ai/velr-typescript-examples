import {
  printRows,
  runIfMain,
  withDb
} from "../example-utils.js";

export async function main() {
  await withDb(async (db) => {
    const stream = db.exec("RETURN 'first' AS table_name; RETURN 'second' AS table_name");
    try {
      for (const table of stream) {
        console.log("columns:", table.columnNames());
        printRows(table.toObjects());
        table.close();
      }
    } finally {
      stream.close();
    }
  });
}

runIfMain(import.meta.url, main);
