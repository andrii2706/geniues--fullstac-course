import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export const register = async (req, res) => {
    try {
        const { userName, email, password: pass, role } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(pass, salt);

        const user = await User.create({
            userName,
            email,
            password: hash,
            role,
        });

        const { password, ...userData } = user._doc;
        return res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password: pass } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValid = await bcrypt.compare(pass, user.password);

        if (!isValid) {
            return res.status(404).json({
                message: '',
            });
        }
        const { password, ...userData } = user._doc;

        return res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
