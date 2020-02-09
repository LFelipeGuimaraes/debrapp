'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        'user_schools',
        'is_manager',
        Sequelize.BOOLEAN
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'user_schools',
      'is_manager',
    );
  }
};
