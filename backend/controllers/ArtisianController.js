const Artisian = require('../model/Artisians');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../model/users');
const CreateUser = async (req, res) => {
    const { name,  email, password } = req.body;
  
    if (!name ||!email ||!password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingArtisian = await User.findOne({ email });
        if (existingArtisian) {
            return res.status(400).json({ message: 'Artisian already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ name,  email, password: hashedPassword });
        console.log(user);
        const token = jsonwebtoken.sign({ name: user.name, id: user._id },
            'test', { expiresIn: '1h' });
        await user.save();
        res.status(201).json({ message: 'Artisian created successfully',success: true,token, user,name:user.name,role:user.role });
    } catch (error) {
        res.status(500).json({ 
            message: 'Server error, please try again later.', 
            error: error.message 
        });
    }
}

const CreateArtisian = async function (req, res) { 
    try {
        const { name, email, password } = req.body;
        if (!name ||!email ||!password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingArtisian = await Artisian.findOne({ email
        });
        if (existingArtisian) {
            return res.status(400).json({ message: 'Artisian already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const artisian = new Artisian({ name, email, password: hashedPassword });
        await artisian.save();
        res.status(201).json({ message: 'Artisian created successfully', artisian,success:true ,role: artisian.role });
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Server error, please try again later.', 
            error: error.message 
        });
    }
}


const LoginArtisian = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        
        const artisian = await Artisian.findOne({ email });
        if (!artisian) {
            return res.status(404).json({ message: 'Artisian not found' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, artisian.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken.sign({ name: artisian.name, id: artisian._id },
            'test', { expiresIn: '1h' });
            
        res.json({ message: 'Login successful',success:true, token,admin :true, artid: artisian._id });
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Server error, please try again later.', 
            error: error.message 
        });
    
    }
}

const UserLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email ||!password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken.sign({ name: user.name, id: user._id },
            'test', { expiresIn: '1h' });
            
        res.json({ message: 'Login successful', token });
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Server error, please try again later.', 
            error: error.message 
        });
    
    }
}



module.exports = { CreateArtisian, LoginArtisian ,
    UserLogin, CreateUser
};