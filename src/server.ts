import 'dotenv/config';
import App from './app';
import validateEnv from './utils/validateEnv';
import WorkoutRoute from './routes/workout.route';

validateEnv();

const app = new App([
  new WorkoutRoute(),
]);

app.listen();
