import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import validateEnv from './utils/validateEnv';
import WorkoutRoute from './routes/workout.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new WorkoutRoute(),
]);

app.listen();
