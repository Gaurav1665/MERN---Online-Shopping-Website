import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import UserSchema from '../../Schemas/UserSchema.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../../Frontend/public/Images/UserImage');
        console.log('Absolute upload path:', path.resolve(uploadPath));
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Add User API (POST)
router.post("/", upload.single('UserProfileImage'), async (req, res) => {
    const { UserName, UserEmail, UserPassword, UserContact, UserAddress, UserCity, UserState, UserCountry, UserPincode } = req.body;
    const UserProfileImage = req.file ? req.file.filename : null;

    const newUser = new UserSchema({
        UserName,
        UserEmail,
        UserPassword,
        UserContact,
        UserAddress,
        UserCity,
        UserState,
        UserCountry,
        UserPincode,
        UserProfileImage
    });
    
    await newUser.save();
    res.send("User created successfully");
});

//Login API
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update User API (PUT)
router.put("/:id", upload.single('UserProfileImage'), async (req, res) => {
    const { UserName, UserEmail, UserPassword, UserContact, UserAddress, UserCity, UserState, UserCountry, UserPincode } = req.body;
    const UserProfileImage = req.file ? req.file.filename : null;

    const updatedUser = await UserSchema.findByIdAndUpdate(
        req.params.id,
        { 
            UserName,
            UserEmail,
            UserPassword,
            UserContact,
            UserAddress,
            UserCity,
            UserState,
            UserCountry,
            UserPincode, 
            UserProfileImage: UserProfileImage || undefined
        },
        { new: true }
    );

    if (!updatedUser) {
        return res.send("User not found");
    }
    res.send("User updated successfully");
});

// Get All Users
router.get("/", async (req, res) => {
    const data = await UserSchema.find();
    res.send(data);
});

// Get User By ID
router.get("/:id", async (req, res) => {
    const data = await UserSchema.findOne({ _id: req.params.id });
    res.send(data);
});

// Delete User By ID
router.delete("/:id", async (req, res) => {
    const data = await UserSchema.deleteOne({ _id: req.params.id });
    res.send(data);
});

export default router;