// Serve dist/ locally:  npm run preview [port]   ->  http://localhost:4173
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { DIST } from "../src/lib/config.mjs";

const PORT = Number(process.argv[2] || process.env.PORT || 4173);
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".xml": "application/xml", ".txt": "text/plain" };

http
  .createServer((req, res) => {
    const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let f = path.join(DIST, p);
    if (!f.startsWith(DIST)) { res.writeHead(403).end(); return; }
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
    if (!fs.existsSync(f)) {
      res.writeHead(404, { "Content-Type": TYPES[".html"] });
      res.end(fs.readFileSync(path.join(DIST, "404.html")));
      return;
    }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" });
    fs.createReadStream(f).pipe(res);
  })
  .listen(PORT, () => console.log(`Preview: http://localhost:${PORT}`));
