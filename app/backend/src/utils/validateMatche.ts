import Matches from '../database/models/matches';
import ValidationError from '../erros/ValidationError';

const validateMatche = (matche: Matches): void => {
  const { awayTeam, homeTeam } = matche;
  const message = 'It is not possible to create a match with two equal teams';
  if (awayTeam === homeTeam) throw new ValidationError(401, message);
};

export default validateMatche;
