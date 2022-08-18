import Team from '../database/models/teams';

export interface ITeam {
  id?: number
  teamName: string
}

export interface ITeamService {
  getAll(): Promise<ITeam[]>
}

export default class TeamService implements ITeamService {
  private db = Team;

  async getAll(): Promise<ITeam[]> {
    const teams = await this.db.findAll();
    return teams;
  }
}
