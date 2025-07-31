import express from 'express';
import passport from 'passport';
import { signup, login,googleCallback, logout } from '../controllers/authcontroller.js';

const router = express.Router();


// your routes
router.post('/signup', signup);
router.post('/login', login);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {successRedirect: process.env.FRONTEND_URL + '/meetings', failureRedirect: process.env.FRONTEND_URL + '/login' }), googleCallback);


router.post('/logout', logout);


export default router;
