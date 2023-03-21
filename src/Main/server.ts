import * as dotenv from 'dotenv';
dotenv.config();
// prettier-ignore
import { app } from './config/app';

app.listen({ port: 3000 }, function (err) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
