import { NextFunction, Request, Response } from 'express';
import WorkoutService from '../services/workout.service';

class WorkoutController {
  public workoutService = new WorkoutService();

  public getWorkouts = async (req: Request, res: Response, next: NextFunction) => {
    const categories = req.query.categories && (req.query.categories as string).split(',');
    const from = req.query.from === undefined ? undefined : Number(req.query.from);
    const to = req.query.to === undefined ? undefined : Number(req.query.to);
    const date = req.query.date as string;
    const workouts = await this.workoutService.getWorkouts({ categories, from, to, date });
    res.status(200).send(workouts);
  }

  public getWorkoutDetails = async (req: Request, res: Response, next: NextFunction) => {
    const { workoutId } = req.params;
    const details = await this.workoutService.getWorkoutDetails(workoutId);
    res.status(200).send(details);
  }

}

export default WorkoutController;
