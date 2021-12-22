/*
Input: npm run calculateBmi 180 91
Output: Overweight (Pre-obese)

Input: npm run calculateBmi 180 74
Output: Normal range
*/

interface BMIValues {
  height: number;
  weight: number;
}

interface BMIQueryRequest {
  height: string;
  weight: string;
}

export interface BMIQueryResponse {
  height: number;
  weight: number;
  bmi: string;
}

const parseArgumentsBMI = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const parseQueryBMI = (req: BMIQueryRequest): BMIValues => {
  if (!req.height || !req.weight) {
    throw new Error('malformatted parameters');
  }

  if (!isNaN(Number(req.height)) && !isNaN(Number(req.weight))) {
    return {
      height: Number(req.height),
      weight: Number(req.weight)
    };
  } else {
    throw new Error('malformatted parameters');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const heightInM : number = height / 100;
  const BMIFloat: number = weight / (heightInM ** 2);
  const BMI: number = Math.round(BMIFloat * 10) / 10;
  return (
    BMI < 16.0 ? 'Underweight (Severe thinness)' :
    BMI <= 16.9 ? 'Underweight (Moderate thinness)' :
    BMI <= 18.4 ? 'Underweight (Mild thinness)' :
    BMI <= 24.9 ? 'Normal range' :
    BMI <= 29.9 ? 'Overweight (Pre-obese)' :
    BMI <= 34.9 ? 'Obese (Class I)' :
    BMI <= 39.9 ? 'Obese (Class II)' :
    'Obese (Class III)'
  );
};

try {
  const { height, weight } = parseArgumentsBMI(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export const calulateBmiQuery = (query: BMIQueryRequest): BMIQueryResponse => {
  const { height, weight } = parseQueryBMI(query);
  const bmi: string = calculateBmi(height, weight);
  return {
    height,
    weight,
    bmi
  };
};