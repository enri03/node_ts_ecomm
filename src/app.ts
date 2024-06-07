import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
//import userRoutes from './routes/userRoutes';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes

app.use("/api", (req: express.Request, res: express.Response) => {
    res.status(200).json({ message: 'Test is successful' });
});
// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || 500).send({
    error: {
      message: err.message,
    },
  });
});

export default app;
