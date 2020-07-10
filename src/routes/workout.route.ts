import { Router } from 'express';
import WorkoutController from '../controllers/workout.controller';
import { CreateUserDto } from '../dtos/users.dto';

class WorkoutRoute {
  public router = Router();
  public workoutController = new WorkoutController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', this.workoutController.getWorkouts);
  }
}

export default WorkoutRoute;
