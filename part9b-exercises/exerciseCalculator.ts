interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExerciseHours: Array<number>): Result => {
  const periodLength: number = dailyExerciseHours.length;
  const trainingDays: number = dailyExerciseHours
    .filter(dailyHour => dailyHour > 0)
    .length;
  const totalHours: number = dailyExerciseHours
    .reduce((a, b) => a + b, 0)
  const average: number = totalHours / periodLength;
  const target: number = 2;
  const success: boolean = average >= target;
  const rating: number =
    average / target >= 1 ? 3 :
    average / target >= 0.75 ? 2 :
    1;
  const ratingDescription: string = 
    rating === 3 ? 'good job' :
    rating === 2 ? 'not too bad but could be better' :
    'need to work on it'

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));
/*
{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 }
*/