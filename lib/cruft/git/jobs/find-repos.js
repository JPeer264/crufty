const chalk = require('chalk');

const openPrompt = require('../helpers/open-prompt');
const prepareGitFolders = require('../helpers/prepare-git-folders');

module.exports = (app) => ({
  name: 'Find repos',
  value: () => {
    const foundFolders = prepareGitFolders(app.path);

    if (foundFolders.length <= 0) {
      console.log(chalk.green('No dirty repositories found.'));

      return;
    }

    openPrompt(
      `${foundFolders.length} dirty repositories found. Choose one or more to open them:`,
      foundFolders,
    );
  },
});
