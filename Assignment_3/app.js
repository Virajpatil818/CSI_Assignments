const fs = require('fs');

function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

function writeFilePromise(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

async function processFile() {
  try {
    const data = await readFilePromise('input.txt');
    const upperCaseData = data.toUpperCase();
    await writeFilePromise('output.txt', upperCaseData);
    console.log('File written successfully');
  } catch (err) {
    console.error('Error:', err);
  }
}

processFile();
