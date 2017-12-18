const inquirer = require('inquirer');

const git = require('./git');

module.exports = (app) => {
  const choicesList = [];
  const allCrufts = {
    git,
  };

  Object.keys(allCrufts).forEach((key) => {
    choicesList.push({
      value: key,
      name: allCrufts[key](app).description,
    });
  });

  // start the initial inquirer task
  inquirer.prompt({
    type: 'list',
    name: 'cruft',
    message: 'Choose your crufty main target',
    choices: choicesList,
  }).then((result) => {
    const { choices, description } = allCrufts[result.cruft](app);

    inquirer.prompt({
      type: 'list',
      name: 'cruft',
      message: description,
      choices,
    }).then((answer) => answer.cruft());
  });
};
