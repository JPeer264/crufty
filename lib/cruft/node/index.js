module.exports = (app) => ({
  description: 'Node',
  choices: [
    {
      name: 'Find node_modules dir, last modified 2 months',
      value: () => {
        console.log(app);
      },
    },
  ],
});
