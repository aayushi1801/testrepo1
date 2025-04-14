const User = require('./user.model.js');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');

// 🟢 Create a user
const createUser = async (req, res) => {
    try {
        const { name, email, age, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, age, password: hashedPassword });
        await newUser.save();

        const payload = {
            email: User.email,
            password: User.password,
        }

        const token =jwt.sign(payload,'1801',{expiresIn:'10d'});

        res.status(201).json({ message: 'User created successfully', user: newUser ,token:token });
    } catch (error){
     console.error("Create User Error:", error);
     
        res.status(500).json({ message: 'Error creating user', error });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error getting users', error });
    }
};




const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};


const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign(
            { userId: user.email, email: user.password },
            '01',
            { expiresIn: '3d' }
        );

        res.status(200).json({
            message: 'Login successful',
            user: { name: user.name, email: user.email },
            token: token
        });

    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};
module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    loginUser
};