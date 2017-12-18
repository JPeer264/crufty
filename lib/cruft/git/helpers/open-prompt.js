const inquirer = require('inquirer');
const opn = require('opn');
const chalk = require('chalk');

module.exports = (message, choices) => (
  new Promise((res, rej) => (
    inquirer.prompt({
      type: 'checkbox',
      name: 'open',
      message,
      choices,
    }).then((answer) => {
      answer.open.forEach((o) => opn(o, { wait: false }));
      chalk.green(`Opened ${answer.open.length} folders for you.`);

      res(answer);
    }).catch(rej)
  ))
);
