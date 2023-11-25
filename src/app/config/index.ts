import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  connection_string: process.env.DB_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUND,
};