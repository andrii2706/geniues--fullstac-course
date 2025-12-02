import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export default async (req, res, next) => {
    if (
        res.headers?.authorization &&
        res.headers.authorization.indexOf('Basic') === -1
    ) {
        return res.status(401).json({ message: 'User is not auth' });
    }

    const base64Creadentials = req.headers.authorization.split(' ')[1];

    const credentials = Buffer.from(base64Creadentials, 'base64').toString(
        'ascii'
    );

    const [email, password] = credentials.split(':');

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return res.status(400).json({
            message: 'Invalid password or email',
        });
    }

    req.user = user._doc;

    next();
};
