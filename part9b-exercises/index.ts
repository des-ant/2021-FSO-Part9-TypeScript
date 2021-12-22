import express from 'express';
const app = express();

import { BMIQueryResponse, calulateBmiQuery } from './bmiCalculator';
import { exerciseResult, calculateExercisesRequest } from './exerciseCalculator';

// Use express middleware to parse incoming requests with JSON payloads
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log(req.query);
  try {
    const height = String(req.query.height);
    const weight = String(req.query.weight);
    const response: BMIQueryResponse = calulateBmiQuery({ height, weight });
    return res.json(response);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(400).json({ error: errorMessage });
  }
});

app.post('/exercises', (req, res) => {
  console.log(req.body);
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response: exerciseResult = calculateExercisesRequest(req.body);
    return res.json(response);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(400).json({ error: errorMessage });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});