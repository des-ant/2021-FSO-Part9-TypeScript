
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

console.log(calculateBmi(180, 74));
