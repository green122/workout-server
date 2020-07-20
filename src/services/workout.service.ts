import {isEmptyObject} from '../utils/util';
import {promises} from 'fs';
import {Workout} from "../models/Workout";

interface GetWorkoutsArguments {
  categories?: string[];
  from?: number;
  to?: number;
  date: string;
}

class WorkoutService {
  private result: Workout[];

  private async getDBData() {
    try {
      const file = await promises.readFile(`${process.cwd()}/src/MOCK_DATA.json`, {encoding: 'utf8'});
      this.result = JSON.parse(file);
    } catch (e) {
      console.log(e);
    }
  }

  public async getWorkouts({categories, from, to, date}: GetWorkoutsArguments) {
    await this.getDBData();
    if (categories) {
      this.result = this.result.filter(workout => categories.includes(workout.category));
    }
    if (date) {
      const dateObj = new Date(date);
      const month = dateObj.getUTCMonth();
      const year = dateObj.getUTCFullYear();
      this.result = this.result.filter((workout) => {
        const workOutDate = new Date(workout.startDate);
        return workOutDate.getUTCMonth() === month && workOutDate.getUTCFullYear() === year;
      });
    }
    return {workouts: this.result.slice(from || 0, to), total: this.result.length};
  }

  public async getWorkoutDetails(id: string) {
    await this.getDBData();
    const numberId = Number(id);
    const result = this.result.find(workout => workout.id === numberId);
    return result;
  }
}

export default WorkoutService;
