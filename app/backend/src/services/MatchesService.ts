import Matches from '../database/models/matches';
import Team from '../database/models/teams';

export interface IMatche extends Matches {
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

export interface IMatchesService {
  getAll(): Promise<IMatche[]>
}

export default class MatchesService implements IMatchesService {
  private db = Matches;
  async getAll(): Promise<IMatche[]> {
    const matches = await this.db.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: ['teamName'],
      },
      ],
    });
    return matches as IMatche[];
  }
}
