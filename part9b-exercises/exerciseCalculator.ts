/*
Input: npm run calculateExercises 2 3 0 2 4.5 0 3 1
Output:
{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 }

Input: npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
Output:
{ periodLength: 9,
  trainingDays: 6,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.7222222222222223 }
*/

interface exerciseValues {
  target: number;
  dailyExerciseHours: Array<number>;
}

const parseArgumentsExercise = (args: Array<string>): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  // Ignore first two arguments that are required for the npm script to run this
  // program
  const [, , targetInput, ...inputList] = args;

  if(isNaN(Number(targetInput))) {
    throw new Error('Provided values were not numbers!');
  }

  const target = Number(targetInput);

  const dailyExerciseHours: Array<number> = inputList.map(val => {
    if(isNaN(Number(val))) {
      throw new Error('Provided values were not numbers!');
    }
    return Number(val);
  });

  return {
    target,
    dailyExerciseHours
  };
};

interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (target: number, dailyExerciseHours: Array<number>): exerciseResult => {
  const periodLength: number = dailyExerciseHours.length;
  const trainingDays: number = dailyExerciseHours
    .filter(dailyHour => dailyHour > 0)
    .length;
  const totalHours: number = dailyExerciseHours
    .reduce((a, b) => a + b, 0);
  const average: number = totalHours / periodLength;
  const success: boolean = average >= target;
  const rating: number =
    average / target >= 1 ? 3 :
    average / target >= 0.75 ? 2 :
    1;
  const ratingDescription: string = 
    rating === 3 ? 'good job' :
    rating === 2 ? 'not too bad but could be better' :
    'need to work on it';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};


try {
  const { target, dailyExerciseHours } = parseArgumentsExercise(process.argv);
  console.log(calculateExercises(target, dailyExerciseHours));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
