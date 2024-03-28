import * as process from 'process';
import * as dotenv from 'dotenv';

dotenv.config();
export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
