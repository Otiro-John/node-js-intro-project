// Import the required modules
const http = require('http');  // This module lets us create a server
const fs = require('fs');      // This module lets us read files
const path = require('path');  // This module helps with file paths

// Create the server
const server = http.createServer((req, res) => {
  // Set the base file path as the current directory (./)
  let filePath = './';

  // Check the requested URL and set the correct file to serve
  if (req.url === '/') {
    filePath += 'index.html';         // Serve index.html for the homepage
  } else if (req.url === '/about') {
    filePath += 'about.html';         // Serve about.html for /about
  } else if (req.url === '/contact') {
    filePath += 'contact.html';    // Serve contact-me.html for /contact-me
  } else {
    filePath += '404.html';           // Serve 404.html for any other URL
  }

  // Set the content type to 'text/html' since we're serving HTML files
  const extname = path.extname(filePath);  // Get the file extension (e.g., .html)
  let contentType = 'text/html';           // Default content type is HTML

  // Read the file that matches the requested URL
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // If there's an error reading the file, send a 500 error (Server Error)
      res.writeHead(500);
      res.end('Sorry, something went wrong on the server');
    } else {
      // If no error, send the correct HTML file with a 200 status (OK)
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');  // Send the file content to the browser
    }
  });
});

// Make the server listen on port 8080
server.listen(8080, () => {
  console.log('Server is running at http://localhost:8080');  // Log that the server is running
});
