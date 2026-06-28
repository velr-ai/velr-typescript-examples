import {
  runIfMain,
  withDb
} from "../example-utils.js";

export async function main() {
  await withDb(async (db) => {
    console.log("schema version:", db.schemaVersion());
    console.log("current schema version:", db.currentSchemaVersion());
  });
}

runIfMain(import.meta.url, main);
