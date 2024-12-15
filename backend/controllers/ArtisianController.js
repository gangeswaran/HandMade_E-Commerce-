const Artisian = require('../model/Artisians');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../model/users');

const CreateUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { name }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or name already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const username = name.toLowerCase().replace(/\s+/g, '_') + Math.floor(Math.random() * 1000); // Generate unique username
        const user = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            username 
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ 
            message: 'Server error, please try again later.', 
            error: error.message 
        });
    }
};





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
        const token = jsonwebtoken.sign({ name: artisian.name, id: artisian._id },
            'test', { expiresIn: '1h' });
        await artisian.save();
        res.status(201).json({ message: 'Artisian created successfully',admin :true,token,artisian,success:true ,role: artisian.role ,artid: artisian._id });
        
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
            
        res.json({ message: 'Login successful',success:true, token,admin :true, role:artisian.role ,artid: artisian._id });
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Server error, please try again later.', 
            error: error.message 
        });
    
    }
}

const UserLogin = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // 1️⃣ Check if the user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // 2️⃣ Compare passwords using bcrypt
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // 3️⃣ Generate a JWT token (only include user ID to avoid exposing sensitive info)
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // 4️⃣ Send token in HTTP-Only cookie (this is more secure than localStorage)
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000, // 1 hour
      });
  
      res.status(200).json({ message: 'Login successful', codCount:user.codCount,token,userid: user._id});
    } catch (error) {
      console.error('❌ Server Error:', error);
      res.status(500).json({ message: 'Server error, please try again later.' });
    }
  };

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error, please try again later.', error: error.message });
    }
}


const updateEarnedAmountForArtisian = async (req, res) => {
    const { artisianId, amount } = req.body;

    // Check if artisanId and amount are provided
    if (!artisianId || amount === undefined) {
        return res.status(400).json({ message: 'Artisan ID and amount are required' });
    }

    // Check if the amount is a positive number
    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    try {
        // Find the artisan by ID
        const artisian = await Artisian.findById(artisianId);

        if (!artisian) {
            return res.status(404).json({ message: 'Artisan not found' });
        }

        // Update the earned amount by adding the new amount
        artisian.earnedAmount += amount;
        console.log(artisian.earnedAmount);
        // Save the updated artisan document
        await artisian.save();

        res.status(200).json({
            message: 'Earned amount updated successfully',
            earnedAmount: artisian.earnedAmount,
        });
    } catch (error) {
        console.error('❌ Server Error:', error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};

const getEarnedAmount = async (req, res) => {
    console.log('Request params:', req.params);  // Log entire params object

   const artisanId = req.params.id;
   console.log(artisanId);
     try {
       const artisan = await Artisian.findOne({ _id: new mongoose.Types.ObjectId(artisanId) });
       res.json({ earnedAmount: artisan.earnedAmount }); 
       console.log(artisan.earnedAmount);
     } catch (error) {
        console.log('❌ Server Error:', error);
       res.status(500).json({ message: 'Server error, please try again later.', error: error.message });
     }
}

const leader = async (req, res) => {
    try {
        const artisans = await Artisian.find().sort({ earnedAmount: -1 }).limit(5);
        res.json(artisans);
    } catch (error) {
        console.error('�� Server Error:', error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};


const codPayment = async (req, res) => {
    try {
      const { id } = req.params; // Change to match URL param
      if (!id) {
        console.log('User ID is required');
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      const user = await User.findById(id); // Using id instead of userId
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.codCount >= 5) {
        return res.status(200).json({ message: 'COD limit reached. You cannot make more COD payments.' });
      }
  
      user.codCount += 1;
      await user.save();
  
      res.status(200).json({ 
        message: 'COD payment successful!', 
        codCount: user.codCount 
      });
  
    } catch (error) {
      console.error('Error in COD Payment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  





module.exports = { CreateArtisian, LoginArtisian ,
    UserLogin, CreateUser, getUserById, updateEarnedAmountForArtisian,getEarnedAmount,leader ,codPayment  
};