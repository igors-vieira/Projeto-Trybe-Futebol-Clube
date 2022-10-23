'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', { 
    id: { 
      type: Sequelize.INTEGER,
      allowNull: false, 
      primaryKey: true,
      autoIncrement: true,
      },
    email: {
      type: Sequelize.STRING,
      allowNull: false, 
      },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      },
    username: {
      type: Sequelize.STRING,
      allowNull: false, 
      },
    role: {
      type: Sequelize.STRING,
      allowNull: false, 
      }
    }, 
    {
      timestamps: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
