const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Basic Node.js server working!' }));
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`✅ Basic server running on http://localhost:${PORT}`);
});