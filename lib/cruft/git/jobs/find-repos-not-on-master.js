const chalk = require('chalk');
const branchName = require('current-git-branch');

const openPrompt = require('../helpers/open-prompt');
const prepareGitFolders = require('../helpers/prepare-git-folders');

module.exports = (app) => ({
  name: 'Find repos which are not on master',
  value: () => {
    const preparedFolders = prepareGitFolders(app.path);
    const folderNotOnMaster = [];
    const foundFolders = preparedFolders.map((folder) => {
      const branch = branchName(folder);
      const isOnMaster = branchName(folder) === 'master';
      const color = isOnMaster ? chalk.green : chalk.red;
      const name = `${folder} ${color.bold(`(${branch})`)}`;

      if (!isOnMaster) {
        folderNotOnMaster.push(folder);
      }

      return {
        name,
        value: folder,
      };
    });

    if (foundFolders.length <= 0) {
      console.log(chalk.green('Every repository is on the master.'));

      return;
    }

    openPrompt(
      `${folderNotOnMaster.length} repo(s) are not on the master branch. Choose one or more to open them:`,
      foundFolders,
    );
  },
});
