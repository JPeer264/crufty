const findRepos = require('./jobs/find-repos');
const findReposNotOnMaster = require('./jobs/find-repos-not-on-master');

const allJobs = [
  findRepos,
  findReposNotOnMaster,
];

module.exports = (app) => ({
  description: 'Git',
  choices: allJobs.map((job) => job(app)),
});
