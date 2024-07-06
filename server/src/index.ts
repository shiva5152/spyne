import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import morgan from 'morgan';
import connectDB from './lib/connectDB.js';
import userRouter from './routes/userRoute.js';
import discussionRouter from './routes/discussionRoute.js';
import commentRouter from './routes/commentRoute.js';
import errorMiddleware from './middleware/error.js';
dotenv.config();

const app: Express = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/discussion", discussionRouter);
app.use("/api/v1/comment", commentRouter);

// error middleware
app.use(errorMiddleware);


const port = process.env.PORT || 8000;

const start = async () => {
  try {
    if (process.env.MONGO_URL) {
      await connectDB(process.env.MONGO_URL);
      app.listen(port, () =>
        console.log(
          `⚡️[server]: Server iS running at http://localhost:${port} as well as connected with database`
        )
      );
    }


  } catch (error) {
    console.log(error);
  }
};
start();