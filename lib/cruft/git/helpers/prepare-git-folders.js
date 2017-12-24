const path = require('path');
const glob = require('glob');
const isGit = require('is-git-repository');
const gitRoot = require('git-root');
const logUpdate = require('log-update');

module.exports = (pattern = process.cwd()) => {
  logUpdate('Searching...');

  // check if the pattern is in a git repo
  if (isGit(pattern)) {
    const removeGitFolder = pattern.replace(/.git\/?$/, '');
    return [gitRoot(removeGitFolder)];
  }

  // TODO: find another way than sync.
  // ****: CTRL+C does not work until the search has ended
  const folders = glob.sync(path.join(pattern, '**', '.git'), { mark: true });

  const foundFolders = [];

  folders.forEach((folder) => {
    if (!isGit(folder)) {
      return;
    }

    const removeGitFolder = folder.replace(/.git\/?$/, '');
    const root = gitRoot(removeGitFolder);

    if (!foundFolders.includes(root)) {
      foundFolders.push(root);
    }
  });

  logUpdate.clear();

  return foundFolders;
};
