import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __filename and __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the base directory for file operations
const baseDir = path.join(__dirname, 'files');

// Utility function to handle responses
const sendResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

// Serve static files
const serveStaticFile = (filePath, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
};

// Create HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const method = req.method.toUpperCase();
  const pathname = parsedUrl.pathname;

  // Log the request details
  console.log(`Received request: Method = ${method}, Pathname = ${pathname}`);

  if (method === 'GET' && (pathname === '/' || pathname === '/index.html')) {
    serveStaticFile(path.join(__dirname, 'public', 'index.html'), res);
  } else if (method === 'GET' && pathname === '/script.js') {
    serveStaticFile(path.join(__dirname, 'public', 'script.js'), res);
  } else if (method === 'POST' && pathname === '/create') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { filename, content } = JSON.parse(body);
      const fullPath = path.join(baseDir, filename);
      fs.writeFile(fullPath, content, err => {
        if (err) return sendResponse(res, 500, { error: 'File creation failed' });
        sendResponse(res, 201, { message: 'File created successfully' });
      });
    });
  } else if (method === 'GET' && pathname.startsWith('/read/')) {
    const filePath = path.join(baseDir, pathname.replace('/read/', ''));
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return sendResponse(res, 404, { error: 'File not found' });
      sendResponse(res, 200, { content: data });
    });
  } else if (method === 'DELETE' && pathname.startsWith('/delete/')) {
    const filePath = path.join(baseDir, pathname.replace('/delete/', ''));
    fs.unlink(filePath, err => {
      if (err) return sendResponse(res, 404, { error: 'File not found or deletion failed' });
      sendResponse(res, 200, { message: 'File deleted successfully' });
    });
  } else {
    sendResponse(res, 405, { error: 'Method not allowed' });
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
