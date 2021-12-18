/*
Input: npm run calculateBmi 180 91
Output: Overweight (Pre-obese)

Input: npm run calculateBmi 180 74
Output: Normal range
*/

interface BMIValues {
  height: number;
  mass: number;
}

const parseArgumentsBMI = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, mass: number) : string => {
  const heightInM : number = height / 100;
  const BMIFloat: number = mass / (heightInM ** 2);
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
}

try {
  const { height, mass } = parseArgumentsBMI(process.argv);
  console.log(calculateBmi(height, mass));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
