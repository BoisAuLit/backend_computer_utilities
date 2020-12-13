const fs = require('fs');
const csv = require('@fast-csv/parse');

const fetchingShortcuts = (req, res) => {

  const shortcutsFolder = process.env.SHORTCUTS_FOLDER;
  const filenames = fs.readdirSync(shortcutsFolder);


  const promises = [];
  filenames.forEach(filename => {
    const fullPath = shortcutsFolder + filename;
    const shortcutsArr = [];

    const promise = new Promise((resolve, reject) => {
      csv.parseFile(fullPath, {
          headers: true,
          ignoreEmpty: true,
          comment: '#',
          trim: true
        })
        .on('data', data => {
          data['key_combination'] = data['key_combination'].replace(/\s+/g, '').split('+');

          shortcutsArr.push(data);
        })
        .on('end', () => {
          const shortcutFor = filename.split('.')[0];
          resolve({
            shortcutFor: shortcutFor,
            key_combinations: shortcutsArr
          });
        })
        .on('error', err => {
          reject(err);
        });
    });

    promises.push(promise);
  });

  Promise.all(promises)
    .then(values => {
      values.sort((a, b) => {
        a['shortcutFor'].localeCompare(b);
      });

      res.status(200).json(values);
    })
    .catch(err => res.status(404).json(err));
}


module.exports = {
  fetchingShortcuts
};