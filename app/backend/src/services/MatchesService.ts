import Matches from '../database/models/matches';
import Team from '../database/models/teams';
import ValidationError from '../erros/ValidationError';

export interface IMatche extends Matches {
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

export interface IMatchesService {
  getAll(filterProgress: boolean): Promise<IMatche[]>
  createMatches(matche: Matches): Promise<Matches>
  finishMatches(id: number): Promise<void>
}

export default class MatchesService implements IMatchesService {
  private db = Matches;
  private teamHome = {
    model: Team,
    as: 'teamHome',
    attributes: ['teamName'],
  };

  private teamAway = {
    model: Team,
    as: 'teamAway',
    attributes: ['teamName'],
  };

  async getAll(filterProgress: boolean): Promise<IMatche[]> {
    if (filterProgress) {
      const matches = await this.db.findAll({
        include: [this.teamHome, this.teamAway],
        where: { inProgress: true },
      });
      return matches as IMatche[];
    }
    const matches = await this.db.findAll({
      include: [this.teamHome, this.teamAway],
    });
    return matches as IMatche[];
  }

  async createMatches(matche: Matches): Promise<Matches> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = matche;

    const verifyHomeTeam = await Team.findByPk(homeTeam);
    const verifyAwayTeam = await Team.findByPk(awayTeam);

    const message = 'There is no team with such id!';
    if (!verifyHomeTeam || !verifyAwayTeam) throw new ValidationError(404, message);

    const createdMatche = await this.db
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });
    return createdMatche;
  }

  async finishMatches(id: number): Promise<void> {
    await this.db.update({ inProgress: false }, {
      where: { id },
    });
  }
}
