import express, { Application} from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import passport from 'passport'
import passportMiddleware from './middlewares/passport';
import indexRoutes from './routes/index';
import authRoutes from './routes/auth.routes';
import specialRoutes from './routes/special.routes';
import { startConnection } from './database';


const uuidv4 = require('uuid/v4');

// Initializations
const app: Application = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

// Routes
app.use('/api', indexRoutes);
app.use(specialRoutes);

app.get('/', (req, res) => {
    return res.send(`The API is at http://localhost:${app.get('port')}`);
  });

  app.use(authRoutes);

// this folders for this application will be used to store public file images
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;