const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5000;
const ROOT = __dirname;

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogg": "audio/ogg",
  ".wav": "audio/wav",
  ".swf": "application/x-shockwave-flash",
  ".wasm": "application/wasm",
  ".data": "application/octet-stream",
  ".mem": "application/octet-stream",
  ".unity3d": "application/octet-stream",
  ".zip": "application/zip",
};

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Not Found</h1>");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  let urlPath = req.url.split("?")[0];

  if (urlPath === "/") {
    return serveFile(res, path.join(ROOT, "index.html"));
  }

  const fullPath = path.join(ROOT, urlPath);

  fs.stat(fullPath, (err, stat) => {
    if (!err && stat.isFile()) {
      return serveFile(res, fullPath);
    }

    if (!err && stat.isDirectory()) {
      const indexPath = path.join(fullPath, "index.html");
      fs.stat(indexPath, (err2) => {
        if (!err2) {
          return serveFile(res, indexPath);
        }
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Not Found</h1>");
      });
      return;
    }

    const htmlPath = fullPath + ".html";
    fs.stat(htmlPath, (err2) => {
      if (!err2) {
        return serveFile(res, htmlPath);
      }
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Not Found</h1>");
    });
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
