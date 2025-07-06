import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signup = async (req, res) => {
    const { email, password, name } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed, name });
    await user.save();
    res.status(201).json({ message: 'Signup successful' });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{ expiresIn: '30m' });
    res.json({ token });
};

export const googleCallback = (req, res) => {
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET,{ expiresIn: '30m' });
    res.redirect(`http://${process.env.FRONTEND_URL}/?token=${token}`);
};
