# 05

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
      "deno.ns",
      "deno.unstable"
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
[0m[1m[31merror[0m: [0m[1mTS2403 [0m[ERROR]: Subsequent variable declarations must have the same type.  Variable 'BroadcastChannel' must be of type '{ new (name: string): BroadcastChannel; prototype: BroadcastChannel; }', but here has type '{ new (name: string): BroadcastChannel; readonly prototype: BroadcastChannel; }'.
declare var BroadcastChannel: {
[0m[31m            ~~~~~~~~~~~~~~~~[0m
    at [0m[36masset:///lib.deno.broadcast_channel.d.ts[0m:[0m[33m55[0m:[0m[33m13[0m

    'BroadcastChannel' was also declared here.
    declare var BroadcastChannel: {
    [0m[36m            ~~~~~~~~~~~~~~~~[0m
        at [0m[36masset:///lib.dom.d.ts[0m:[0m[33m3196[0m:[0m[33m13[0m

You may have discovered a bug in Deno's fast check implementation. Fast check is still early days and we would appreciate if you log a bug if you believe this is one: https://github.com/denoland/deno/issues/

```
