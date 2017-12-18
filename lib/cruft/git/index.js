module.exports = (app) => ({
  description: 'Git',
  choices: [
    {
      name: 'Find uncommitted repos',
      value: () => {
        console.log(app);
      },
    },
  ],
});
