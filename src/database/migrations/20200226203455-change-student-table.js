'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
        'students',
        'class_id', 
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }
      ).then(() => {
        queryInterface.changeColumn(
          'students',
          'school_id',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        )
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'students',
      'class_id', 
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    ).then(() => {
      queryInterface.changeColumn(
        'students',
        'school_id',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    });
  }
};
