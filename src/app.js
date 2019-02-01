import cors from 'cors';
import express from 'express';
import userRouter from './api/user-api';
import searchRouter from './api/search-api';

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(searchRouter);

let serverOn = false;

module.exports = {
  start: port => {
    if (!serverOn) {
      app.listen(port, err => {
        if (err) {
          throw err;
        }
        console.log('LISTENING ON PORT: ', port);
      });
    } else {
      console.log('Server is already running');
    }
  },
  stop: () => {
    app.close(() => {
      console.log('Server has stopped');
    });
  },
  server: app
};
