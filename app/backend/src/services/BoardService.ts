import Matches from '../database/models/matches';
import Team from '../database/models/teams';
import ITableFull from '../interfaces/ITableFull';
import { calcEfficiency, getTeamStatistic, ordenateTable } from '../utils/boardUtils';

export interface IBoard extends Team, Matches {
  homeMatches: Matches[]
  awayMatches: Matches[]
}

export interface IClassification {
  teamsAndMatches(): Promise<IBoard>
  table(): Promise<ITableFull[]>
}

export default class BoardService {
  private teamService = Team;
  private matchesHome = {
    model: Matches,
    as: 'homeMatches',
    where: { inProgress: false },
  };

  private matchesAway = {
    model: Matches,
    as: 'awayMatches',
    where: { inProgress: false },
  };

  async teamsAndMatches() {
    const table = await this.teamService.findAll({
      include: [this.matchesHome, this.matchesAway],
      attributes: [
        'teamName',
      ],
    });
    return table as IBoard[];
  }

  async table(): Promise<ITableFull[]> {
    const teams = await this.teamsAndMatches();
    const tableFormated = teams.map((obj) => {
      const { home, away, goals } = getTeamStatistic(obj.homeMatches, obj.awayMatches);
      const goalsSg = (goals.home.favor + goals.away.favor) - (goals.home.own + goals.away.own);
      const newObject = {
        name: obj.teamName,
        totalPoints: (home.victory * 3) + (away.victory * 3) + (home.draw + away.draw),
        totalGames: obj.homeMatches.length + obj.awayMatches.length,
        totalVictories: (home.victory) + (away.victory),
        totalDraws: (home.draw) + (away.draw),
        totalLosses: (home.losse) + (away.losse),
        goalsFavor: goals.home.favor + goals.away.favor,
        goalsOwn: goals.home.own + goals.away.own,
        goalsBalance: goalsSg,
      };
      return { ...newObject, efficiency: calcEfficiency(newObject) };
    });

    return ordenateTable(tableFormated);
  }

  async tableHome(): Promise<ITableFull[]> {
    const teams = await this.teamsAndMatches();
    const tableFormated = teams.map((obj) => {
      const { home, goals } = getTeamStatistic(obj.homeMatches, obj.awayMatches);

      const newObject = {
        name: obj.teamName,
        totalPoints: (home.victory * 3) + (home.draw),
        totalGames: obj.homeMatches.length,
        totalVictories: (home.victory),
        totalDraws: (home.draw),
        totalLosses: (home.losse),
        goalsFavor: goals.home.favor,
        goalsOwn: goals.home.own,
        goalsBalance: goals.sgHome,
      };
      return { ...newObject, efficiency: calcEfficiency(newObject) };
    });

    return ordenateTable(tableFormated);
  }

  async tableAway(): Promise<ITableFull[]> {
    const teams = await this.teamsAndMatches();
    const tableFormated = teams.map((obj) => {
      const { away, goals } = getTeamStatistic(obj.homeMatches, obj.awayMatches);

      const newObject = {
        name: obj.teamName,
        totalPoints: (away.victory * 3) + (away.draw),
        totalGames: obj.awayMatches.length,
        totalVictories: (away.victory),
        totalDraws: (away.draw),
        totalLosses: (away.losse),
        goalsFavor: goals.away.favor,
        goalsOwn: goals.away.own,
        goalsBalance: goals.sgAway,
      };
      return { ...newObject, efficiency: calcEfficiency(newObject) };
    });

    return ordenateTable(tableFormated);
  }
}
