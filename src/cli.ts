#!/usr/bin/env node
import { pathToFileURL } from "node:url";
import { EXAMPLES, loadExample, type ExampleName } from "./registry.js";

function printHelp(): void {
  console.log("Usage:");
  console.log("  velr-ts-examples list");
  console.log("  velr-ts-examples <example_name>");
  console.log();
  console.log("Examples:");
  for (const name of EXAMPLES) console.log(`  ${name}`);
}

export async function main(argv = process.argv.slice(2)): Promise<number> {
  if (argv.length === 0 || ["-h", "--help", "help"].includes(argv[0]!)) {
    printHelp();
    return 0;
  }

  const command = argv[0]!;
  if (command === "list") {
    for (const name of EXAMPLES) console.log(name);
    return 0;
  }

  if (!EXAMPLES.includes(command as ExampleName)) {
    console.error(`Unknown example: ${command}`);
    console.error();
    console.error("Run `velr-ts-examples list` to see available examples.");
    return 2;
  }

  const module = await loadExample(command as ExampleName);
  await module.main();
  return 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const code = await main();
  process.exitCode = code;
}
