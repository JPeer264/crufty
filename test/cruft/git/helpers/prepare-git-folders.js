const test = require('ava');
const path = require('path');

const renameHelper = require('../../../rename-helper');
const prepareGitFolders = require('../../../../lib/cruft/git/helpers/prepare-git-folders');

test.cb.before((t) => {
  renameHelper().then(() => {
    t.end();
  });
});

test('find all repos', (t) => {
  const preparedGitFolders = prepareGitFolders(path.join(process.cwd(), 'test'));

  t.is(preparedGitFolders.length, 3);
});

test('find all repos from the process.cwd()', (t) => {
  const preparedGitFolders = prepareGitFolders(path.join(process.cwd(), 'test/fixtures/repo/subfolder'));

  t.is(preparedGitFolders.length, 1);
  t.is(preparedGitFolders[0], path.join(process.cwd(), 'test/fixtures/repo'));
});
