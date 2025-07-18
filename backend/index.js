// server.js
import express from 'express';
dotenv.config();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import { v4 as uuidV4 } from 'uuid';
await import('./config/passport.js');

const app = express();



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));
app.use(cors({
  origin: 'http://localhost:5173', // your frontend port
  credentials: true,               // if using cookies or sessions
}));
app.use(express.json());
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.get('/create-meeting', (req, res) => {
  console.log('Creating new meeting');
  const roomID = uuidV4();
  res.json({ roomID });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
