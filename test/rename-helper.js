const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const temp = require('temp');

const rename = (before, after) => {
  const fixtures = path.join(process.cwd(), 'test/fixtures');
  const folders = glob.sync(path.join(fixtures, '**', before));

  folders.forEach((folder) => {
    const splittedFolder = folder.replace(/\/$g/, '').split('/');

    splittedFolder.pop();
    splittedFolder.push(after);

    const newFolder = splittedFolder.join('/');

    fs.renameSync(folder, newFolder);
  });
};

module.exports = () => {
  temp.track();

  return new Promise((res, rej) => {
    temp.mkdir('crufty-rename-helper', (err, dir) => {
      if (err) {
        rej(err);
      }

      fs.copySync(path.join(process.cwd(), 'test'), path.join(dir, 'test'));
      process.chdir(dir);
      rename('git', '.git');
      res(dir);
    });
  });
};
