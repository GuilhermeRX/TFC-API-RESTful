import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import ValidationError from '../erros/ValidationError';

export default class JwtService {
  static sign(payload: { email: string }): string {
    const secret = process.env.JWT_SECRET as string;
    return jwt.sign(payload, secret);
  }

  static validateToken(token: string) {
    try {
      const secret = process.env.JWT_SECRET as string;
      const data = jwt.verify(token, secret);
      return data as jwt.JwtPayload;
    } catch (err) {
      throw new ValidationError(400, 'Token inválido');
    }
  }
}
