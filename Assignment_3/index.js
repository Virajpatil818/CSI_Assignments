const fs = require('fs');

function readFileCallback(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
}

function writeFileCallback(path, data, callback) {
  fs.writeFile(path, data, (err) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
}

readFileCallback('input.txt', (err, data) => {
  if (err) {
    return console.error('Error reading file:', err);
  }

  const upperCaseData = data.toUpperCase();

  writeFileCallback('output.txt', upperCaseData, (err) => {
    if (err) {
      return console.error('Error writing file:', err);
    }
    console.log('File written successfully');
  });
});


