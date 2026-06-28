# velr-typescript-examples

Examples showing how to use the [Velr](https://velr.ai/) TypeScript driver.

Velr is an embedded property-graph database built in Rust, backed by SQLite, and queried with openCypher. This repository contains small, focused TypeScript examples that demonstrate common patterns when working with the Velr TypeScript API.

The goal of this repository is to help users quickly install Velr from npm, run simple examples, and explore common graph workflows in TypeScript.

> Driver package: these examples use the public npm package `@velr-ai/velr`.

## What this repo contains

Examples in this repository cover:

- opening in-memory and file-backed databases
- creating and querying graph data
- reading result tables row by row
- converting typed values to ordinary TypeScript values
- streaming multiple result tables
- using transactions, rollbacks, and savepoints
- inspecting query plans with `explain()`
- working with openCypher concepts such as `MATCH`, `WHERE`, `MERGE`, `WITH`, paths, and variable-length paths
- modeling real-world graph use cases such as knowledge graphs, fraud detection, access control, org charts, and ticket dependencies
- exporting query results to JS dataframe-shaped data and Apache Arrow
- converting existing result tables to JS objects, columnar data, and Apache Arrow
- binding external JS objects and Apache Arrow data into Velr with `UNWIND BIND(...)`
- reading CSV data and turning it into graph data
- plotting graph-derived data with Vega/Vega-Lite

## Getting started

Clone the repository and install dependencies:

```bash
git clone https://github.com/velr-ai/velr-typescript-examples.git
cd velr-typescript-examples
npm install
```

This installs the published Velr TypeScript driver package from npm:

```bash
npm install @velr-ai/velr
```

Optional examples use packages from the JavaScript data ecosystem:

```bash
npm install apache-arrow arquero csv-parse vega vega-lite
```

This repository targets the Node.js versions supported by the Velr TypeScript driver:

- Node.js 22 or newer

## Running examples

List the available examples:

```bash
npm run list
```

Run a specific example:

```bash
npm run example -- basic_query
```

You can also run the CLI directly:

```bash
npx tsx src/cli.ts list
npx tsx src/cli.ts basic_query
```

## Example layout

Examples mirror the Python examples repository where that makes sense, while keeping the code idiomatic for TypeScript.

### Core driver examples

- `basic_open.ts`
- `basic_query.ts`
- `file_backed.ts`
- `streaming_tables.ts`
- `transaction.ts`
- `rollback.ts`
- `rollback_on_drop.ts`
- `savepoints.ts`
- `explain.ts`

### openCypher examples

- `cypher_match.ts`
- `cypher_where.ts`
- `cypher_relationships.ts`
- `cypher_aggregates.ts`
- `cypher_unwind.ts`
- `cypher_labels_and_properties.ts`
- `cypher_paths.ts`
- `cypher_var_length_paths.ts`
- `cypher_merge.ts`
- `cypher_merge_relationships.ts`
- `cypher_with.ts`
- `cypher_with_aggregates.ts`

### Use case examples

- `usecase_knowledge_graph.ts`
- `usecase_fraud_detection.ts`
- `usecase_ticket_dependencies.ts`
- `usecase_access_control.ts`
- `usecase_org_chart.ts`

### Dataframe, Arrow, CSV, and plotting examples

These mirror the Python dataframe/Arrow workflows using JavaScript ecosystem tools:

- Arquero for dataframe-shaped examples
- ordinary object arrays for lightweight columnar examples
- Apache Arrow for Arrow IPC examples
- csv-parse for CSV examples
- Vega/Vega-Lite for plotting examples

The filenames intentionally match the Python examples so users can move between repositories easily.

## Minimal example

```ts
import { Velr } from "@velr-ai/velr";

const db = Velr.open(null);
try {
  db.run("CREATE (:Person {name:'Keanu Reeves', born:1964})");

  const rows = db.query(
    "MATCH (p:Person) RETURN p.name AS name, p.born AS born",
    { int64: "number" }
  );
  console.log(rows);
} finally {
  db.close();
}
```

## TypeScript style

These examples are intentionally written in an idiomatic TypeScript style.

They generally prefer:

- `try` / `finally` for closing database, stream, table, and transaction handles
- `query()` for convenient object rows
- `execOne()`, `rows()`, and `toObjects()` where table lifecycle matters
- `transaction()`, `withSavepoint()`, and `withSavepointNamed()` for scoped transactional code
- dynamic imports for optional dataframe, Arrow, CSV, and plotting dependencies

The examples aim to stay conceptually close to the Python examples while still feeling natural to TypeScript users.

## Testing

```bash
npm test
```

The default tests verify that the example registry matches the Python module layout and that every example module exports `main()`.

To run a small native smoke test against a local Velr runtime:

```bash
VELR_EXAMPLES_NATIVE=1 npm test
```

## Related links

- [Velr](https://velr.ai/)
- [Velr TypeScript examples](https://github.com/velr-ai/velr-typescript-examples)
- [velr-python-examples](https://github.com/velr-ai/velr-python-examples)
- [velr-rust-examples](https://github.com/velr-ai/velr-rust-examples)

## License

This repository is licensed under the MIT License. See [`LICENSE`](LICENSE).
