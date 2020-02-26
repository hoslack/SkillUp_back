
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    fullName: 'Hoslack Ochieng',
    username: 'hoslack',
    email: 'hoslackochieng@gmail.com',
    phoneNumber: '0723255128',
    password: '$2y$10$cKBHcZPKVhcUOlDwZxBRkuTXyPCp5aRzt2kYFkGBazcH4MbdrruPC',
    location: 'Mwiki',
    profession: 'Computer Science',
    account: 0,
    resume: '',
    picture: '',
    verified: true,
    verificationCode: 'HOS12',
    createdAt: '2019-02-03',
    updatedAt: '2019-02-03',
    roleId: 76902
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
