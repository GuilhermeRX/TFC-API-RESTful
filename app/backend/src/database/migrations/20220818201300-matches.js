'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      homeTeam: {
        field: 'home_team',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        }
      },
      homeTeamGoals: {
        field: 'home_team_goals',
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      awayTeam: {
        field: 'away_team',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        }
      },
      awayTeamGoals: {
        field: 'away_team_goals',
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      inProgress: {
        field: 'in_progress',
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
