import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './teams';

export default class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
  tableName: 'matches',
});

Matches.belongsTo(Team, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});

Matches.belongsTo(Team, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

Team.hasMany(Matches, {
  foreignKey: 'homeTeam',
  as: 'homeMatches',
});

Team.hasMany(Matches, {
  foreignKey: 'awayTeam',
  as: 'awayMatches',
});
