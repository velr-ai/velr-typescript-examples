import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { Velr } from "@velr-ai/velr";
import type { Velr as VelrDb } from "@velr-ai/velr";

export const MOVIES_CREATE = `
CREATE (:Movie {title:'The Matrix', released:1999}),
       (:Movie {title:'Interstellar', released:2014}),
       (:Movie {title:'Arrival', released:2016})
`;

export function runIfMain(metaUrl: string, main: () => void | Promise<void>): void {
  const entry = process.argv[1] ? pathToFileURL(process.argv[1]).href : "";
  if (metaUrl !== entry) return;
  void Promise.resolve(main()).catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}

export async function withDb<T>(fn: (db: VelrDb) => T | Promise<T>): Promise<T> {
  const db = Velr.open(null);
  try {
    return await fn(db);
  } finally {
    db.close();
  }
}

export async function withTempDbPath<T>(fn: (path: string) => T | Promise<T>): Promise<T> {
  const dir = mkdtempSync(join(tmpdir(), "velr-example-"));
  try {
    return await fn(join(dir, "graph.db"));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

export function printRows(rows: readonly Record<string, unknown>[]): void {
  for (const row of rows) {
    console.log(JSON.stringify(row));
  }
}

export async function optionalImport<T = any>(
  specifier: string,
  installHint = specifier
): Promise<T> {
  try {
    return (await import(specifier)) as T;
  } catch (err) {
    const code = typeof err === "object" && err && "code" in err ? (err as { code?: unknown }).code : undefined;
    if (code === "ERR_MODULE_NOT_FOUND" || code === "MODULE_NOT_FOUND") {
      throw new Error(`Optional dependency missing for this example. Install: npm install ${installHint}`);
    }
    throw err;
  }
}
