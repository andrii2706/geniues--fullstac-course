import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        reqiure: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: 'user',
    },
});

const User = mongoose.model('User', userSchema);

export default User;
