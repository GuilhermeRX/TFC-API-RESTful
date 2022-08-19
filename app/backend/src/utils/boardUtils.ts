import Matches from '../database/models/matches';
import ITable from '../interfaces/ITable';
import ITableFull from '../interfaces/ITableFull';

export const checkScoreHome = (homeMatches: Matches[]) => {
  const sc = { victory: 0, draw: 0, losse: 0 };
  homeMatches.forEach((ob) => {
    switch (true) {
      case ob.homeTeamGoals > ob.awayTeamGoals: sc.victory += 1;
        break;
      case ob.homeTeamGoals === ob.awayTeamGoals: sc.draw += 1;
        break;
      case ob.homeTeamGoals < ob.awayTeamGoals: sc.losse += 1;
        break;
      default: return undefined;
    }
  });
  return sc;
};

export const checkScoreAway = (awayMatches: Matches[]) => {
  const sc = { victory: 0, draw: 0, losse: 0 };
  awayMatches.forEach((ob) => {
    switch (true) {
      case ob.homeTeamGoals > ob.awayTeamGoals: sc.losse += 1;
        break;
      case ob.homeTeamGoals === ob.awayTeamGoals: sc.draw += 1;
        break;
      case ob.homeTeamGoals < ob.awayTeamGoals: sc.victory += 1;
        break;
      default: return undefined;
    }
  });
  return sc;
};

export const checkGols = (homeMatches: Matches[], awayMatches: Matches[]) => {
  const goals = { home: { favor: 0, own: 0 }, away: { favor: 0, own: 0 } };

  homeMatches.forEach((obj) => {
    goals.home.favor += obj.homeTeamGoals;
    goals.home.own += obj.awayTeamGoals;
  });

  awayMatches.forEach((obj) => {
    goals.away.favor += obj.awayTeamGoals;
    goals.away.own += obj.homeTeamGoals;
  });
  return {
    ...goals,
    sgHome: goals.home.favor - goals.home.own,
    sgAway: goals.away.favor - goals.away.own,
  };
};

export const getTeamStatistic = (homeMatches: Matches[], awayMatches: Matches[]) => {
  const home = checkScoreHome(homeMatches);
  const away = checkScoreAway(awayMatches);
  const goals = checkGols(homeMatches, awayMatches);

  return { home, away, goals };
};

export const calcEfficiency = (newObject: ITable) => {
  const { totalPoints, totalGames } = newObject;
  const multTotalGames = totalGames * 3;

  const efficiency = (totalPoints / multTotalGames) * 100;
  return Number(efficiency.toFixed(2));
};

export const ordenateTable = (table: ITableFull[]) => {
  const ordenate = table.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);

  return ordenate;
};
