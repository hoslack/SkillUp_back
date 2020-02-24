
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Roles', [
    {
      name: 'Reviewer',
      id: 183123,
      description: 'Reviews CVs',
      createdAt: '2019-02-03',
      updatedAt: '2019-02-03',
    },
    {
      name: 'Candidate',
      id: 324214,
      description: 'Creates CVs and waits for reviews',
      createdAt: '2019-02-03',
      updatedAt: '2019-02-03',
    },
    {
      name: 'Super Administrator',
      id: 76902,
      description: 'Can perform all tasks',
      createdAt: '2019-02-03',
      updatedAt: '2019-02-03',
    }
  ]),

  down: queryInterface => queryInterface.bulkDelete('Roles', null, {})
};
