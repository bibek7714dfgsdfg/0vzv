const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const server = http.createServer((request, response) => {
  const requested = request.url === '/' ? '/index.html' : request.url;
  const filePath = path.join(root, decodeURIComponent(requested.split('?')[0]));
  if (!filePath.startsWith(root)) {
    response.writeHead(403); response.end('Forbidden'); return;
  }
  fs.readFile(filePath, (error, data) => {
    if (error) { response.writeHead(404); response.end('Not found'); return; }
    const type = filePath.endsWith('.html') ? 'text/html' : 'text/plain';
    response.writeHead(200, { 'Content-Type': `${type}; charset=utf-8` });
    response.end(data);
  });
});

server.listen(8000, '127.0.0.1', () => console.log('0VZV site running at http://localhost:8000'));
