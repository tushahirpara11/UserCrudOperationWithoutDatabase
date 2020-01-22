const http = require('http');

const userOperations = require('./userOperation');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  let body = '';
  res.setHeader('Content-Type', 'text/JSON');
  if (req.url === '/add' && req.method == 'POST') {
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      res.end(userOperations.addUser(body));
    });
  }
  if (req.url === '/delete' && req.method === 'DELETE') {
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      res.end(userOperations.deleteUser(JSON.parse(body)));
    });
  }
  else if (req.url === '/edit' && req.method === 'PUT') {
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      res.end(userOperations.updateUser(JSON.parse(body)));
    });
  }
  else if (req.url === '/read' && req.method === 'GET') {
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      res.end(userOperations.getUser(JSON.parse(body)));
    });
  }
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
