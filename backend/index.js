import express from 'express';
dotenv.config();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import { v4 as uuidV4 } from 'uuid';
import { Server } from 'socket.io';
import registerSocketHandlers from './sockets/socketHandler.js';
import { createServer } from 'http';
await import('./config/passport.js');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true,               
}));


app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
   cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);



// Register signaling and chat logic
io.on('connection', socket => {
  registerSocketHandlers(io, socket);
});

app.get('/create-meeting', (req, res) => {
  console.log('Creating new meeting');
  const roomID = uuidV4();
  res.json({ roomID });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
