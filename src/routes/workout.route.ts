import { Router } from 'express';
import WorkoutController from '../controllers/workout.controller';

class WorkoutRoute {
  public router = Router();
  public workoutController = new WorkoutController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/workouts', this.workoutController.getWorkouts);
    this.router.get('/workouts/:workoutId', this.workoutController.getWorkoutDetails);
  }
}

export default WorkoutRoute;
