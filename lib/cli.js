#!/usr/bin/env node
const yargs = require('yargs');
const updateNotifier = require('update-notifier');

const pkg = require('../package.json');
const crufty = require('./cruft');

updateNotifier({ pkg }).notify();

const { argv } = yargs
  .usage('Usage: $0')
  .alias('v', 'version')
  .alias('h', 'help');

crufty({
  argv,
});
