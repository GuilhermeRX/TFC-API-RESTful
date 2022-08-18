import Team from '../database/models/teams';

export interface ITeam {
  id?: number
  teamName: string
}

export interface ITeamService {
  getAll(): Promise<ITeam[]>
  getById(id: number): Promise<ITeam>
}

export default class TeamService implements ITeamService {
  private db = Team;

  async getAll(): Promise<ITeam[]> {
    const teams = await this.db.findAll();
    return teams;
  }

  async getById(id: number): Promise<ITeam> {
    const team = await this.db.findByPk(id);
    return team as ITeam;
  }
}
