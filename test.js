const fs = require('fs');

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, (err, filenames) => {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(filename => {
      fs.readFile(dirname + filename, 'utf-8', (err, content) => {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}

function onFileContent(filename, content) {
  console.log(filename);
  console.log('\t' + content[0]);
}

function onError(err) {
  console.log(err);
}

const path = '/Users/bohaoli/self_made_commands/shortcuts/';

readFiles(path, onFileContent, onError);