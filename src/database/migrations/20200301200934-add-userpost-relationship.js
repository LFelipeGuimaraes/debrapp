'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('posts', 'user_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key:'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('posts', 'user_id');

  }
};