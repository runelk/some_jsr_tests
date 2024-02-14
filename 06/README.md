# 06

## `deno.json`

```js
// deno.json

{
  "name": "@runelk/foo",
  "version": "0.0.1",
  "exports": "./foo.ts",
  "tasks": {
    "run": "deno publish --dry-run 2> stderr.txt",
    "embed": "npx embedme README.md"
  },
  "compilerOptions": {
    "lib": [
      "dom",
      "dom.iterable",
      "dom.asynciterable",
      "deno.ns"
    ]
  }
}
```

## `foo.ts`

```ts
export function foo(name: string): void {
  console.log(`Hello, ${name}!`);
}
```

## Result of running `deno publish --dry-run`

```c
// stderr.txt

Checking fast check type graph for errors...
Ensuring type checks...
[0m[32mCheck[0m file:///path/to/foo.ts
[0m[33mWarning[0m Aborting due to --dry-run

```
