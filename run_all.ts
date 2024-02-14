#!/usr/bin/env -S deno run -A

import $ from "jsr:@dsherret/dax";
import * as fs from "jsr:@std/fs";

async function testDirs() {
  return await Array.fromAsync(
    fs.walk(".", {
      includeDirs: true,
      includeFiles: false,
      match: [/^\d+$/],
    })
  );
}

async function run() {
  for (const dir of await testDirs()) {
    try {
      console.log(`Running ${dir.path}`);
      await $`deno task run`.cwd(dir.path);
    } catch (e) {}
  }
}

async function embed() {
  for (const dir of await testDirs()) {
    try {
      console.log(`Updating README.md in ${dir.path}`);
      await $`deno task embed`.cwd(dir.path);
    } catch (e) {}
  }
}

async function filesToRedact() {
  return await Array.fromAsync(
    fs.walk(".", {
      includeDirs: false,
      exts: [".txt", ".md"],
    })
  );
}

async function redact() {
  const regex = new RegExp("file:.+\\/", "g");

  for (const file of await filesToRedact()) {
    console.log(`Redacting file paths in ${file.path}`);
    const s = await Deno.readTextFile(file.path);
    const result = s.replace(regex, "file:///path/to/");
    await Deno.writeTextFile(file.path, result);
  }
}

if (import.meta.main) {
  await run();
  await embed();
  await redact();
}
