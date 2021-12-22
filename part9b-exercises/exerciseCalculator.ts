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
  daily_exercises: Array<number>;
}

interface exerciseInput {
  target: unknown;
  daily_exercises: unknown;
}

export interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExercise = (req: exerciseInput): exerciseValues => {
  if (!req.target || !req.daily_exercises) throw new Error('parameters missing');
  
  const targetInput = req.target;
  const inputList = req.daily_exercises;

  if(isNaN(Number(targetInput)) || !Array.isArray(inputList)) {
    throw new Error('malformatted parameters');
  }

  const target = Number(targetInput);

  const daily_exercises: Array<number> = inputList.map(val => {
    if(isNaN(Number(val))) {
      throw new Error('malformatted parameters');
    }
    return Number(val);
  });

  return {
    target,
    daily_exercises
  };
};

const parseArgumentsExercise = (args: Array<string>): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  // Ignore first two arguments that are required for the npm script to run this
  // program
  const [, , targetInput, ...inputList] = args;

  return parseExercise({
    target: targetInput,
    daily_exercises: inputList
  });
};

const calculateExercises = (target: number, daily_exercises: Array<number>): exerciseResult => {
  const periodLength: number = daily_exercises.length;
  const trainingDays: number = daily_exercises
    .filter(dailyHour => dailyHour > 0)
    .length;
  const totalHours: number = daily_exercises
    .reduce((a, b) => a + b, 0);
  const average: number = totalHours / periodLength;
  const success: boolean = average >= target;
  const rating: number =
    average / target >= 1 ? 3 :
    average / target >= 0.75 ? 2 :
    1;
  const ratingDescription: string = 
    rating === 3 ? 'good' :
    rating === 2 ? 'not too bad but could be better' :
    'bad';

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
  const { target, daily_exercises } = parseArgumentsExercise(process.argv);
  console.log(calculateExercises(target, daily_exercises));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export const calculateExercisesRequest = (req: exerciseInput): exerciseResult => {
  const { target, daily_exercises } = parseExercise(req);
  return calculateExercises(target, daily_exercises);
};
