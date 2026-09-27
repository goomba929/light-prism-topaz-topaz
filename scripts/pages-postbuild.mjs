#!/usr/bin/env node
import {
  copyFileSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const netlify = process.argv.includes("--netlify");

const candidates = [
  "dist/client",
  "dist",
  ".output/public",
  ".vercel/output/static",
];

const dir = candidates.find(
  (d) => existsSync(join(d, "index.html")) || existsSync(join(d, "_shell.html")),
);
if (!dir) {
  console.error("[pages] no HTML in", candidates.join(", "));
  process.exit(1);
}

const shell = existsSync(join(dir, "_shell.html"))
  ? join(dir, "_shell.html")
  : join(dir, "index.html");

let html = readFileSync(shell, "utf8");
html = html.replaceAll("\u0000", "").replaceAll("/./", "./");
if (netlify) {
  html = html.replaceAll("./assets/", "/assets/");
}
writeFileSync(join(dir, "index.html"), html);
writeFileSync(join(dir, "404.html"), html);
writeFileSync(join(dir, ".nojekyll"), "\n");

writeFileSync(
  join(dir, "_redirects"),
  "/*    /index.html   200\n",
);
writeFileSync(
  join(dir, "_headers"),
  `/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
`,
);
writeFileSync(
  join(dir, "netlify.toml"),
  `[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`,
);

if (existsSync("public/favicon.svg") && !existsSync(join(dir, "favicon.svg"))) {
  copyFileSync("public/favicon.svg", join(dir, "favicon.svg"));
}

console.log(
  `[pages] prepared ${dir} (index.html, 404.html, _redirects${netlify ? ", netlify" : ""})`,
);
