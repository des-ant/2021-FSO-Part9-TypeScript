import express from 'express';
const app = express();

import { BMIQueryResponse, calulateBmiQuery } from './bmiCalculator';

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

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});