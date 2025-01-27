import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import UserSchema from '../../Model/UserSchema';
import CartSchema from '../../Model/CartSchema';

require('dotenv').config();

mongoose.connect(process.env.DBURL).then(() => {
    console.log("Database Connected");

    const router = express.Router();
    router.use(bodyParser.json());

    router.post("/login", async (req, res) => {
        const { UserEmail, UserPassword } = req.body;
    
        const user = await UserSchema.findOne({ UserEmail });
        
        if (!user) {
            return res.send("User not found");
        }
    
        const isMatch = UserPassword == user.UserPassword;
    
        if (!isMatch) {
            return res.send("Invalid credentials");
        }
    
        res.send("Login successful");
    });

    // Set up multer for file upload handling (User profile images)
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../../../Images/UserImage'));  // Store in the Images/UserImage directory
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));  // Add file extension
        }
    });

    const upload = multer({ storage: storage });

    // Add User API (POST)
    router.post("/", upload.single('UserProfileImage'), async (req, res) => {
        const { UserName, UserEmail, UserPassword, UserContact } = req.body;
        const UserProfileImage = req.file ? req.file.filename : null;

        const newUser = new UserSchema({
            UserName,
            UserEmail,
            UserPassword,
            UserContact,
            UserProfileImage
        });

        await newUser.save();
        res.send("User created successfully");
    });

    // Update User API (PUT)
    router.put("/:id", upload.single('UserProfileImage'), async (req, res) => {
        const { UserName, UserEmail, UserPassword, UserContact } = req.body;
        const UserProfileImage = req.file ? req.file.filename : null;

        const updatedUser = await UserSchema.findByIdAndUpdate(
            req.params.id,
            { 
                UserName, 
                UserEmail, 
                UserPassword, 
                UserContact, 
                UserProfileImage: UserProfileImage || undefined
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.send("User not found");
        }

        res.send("User updated successfully");
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

});
