import express from 'express';
import { jobRouter } from './routes/job.routes';
import ServerGlobal from './global';

const app = express();
app.use(express.json());
const PORT = 3000;

ServerGlobal.getInstance();

app.get('/', (req, res) => {
  res.send('Hello, POOP TypeScript with Express!');
});

//TEST

app.use('/job', jobRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
