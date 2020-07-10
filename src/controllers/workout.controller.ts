import { NextFunction, Request, Response } from 'express';
import WorkoutService from '../services/workout.service';

class WorkoutController {
  public workoutService = new WorkoutService();

  public getWorkouts = async (req: Request, res: Response, next: NextFunction) => {
  
  }

}

export default WorkoutController;
