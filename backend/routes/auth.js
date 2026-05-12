import exp from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { checkUser } from "../middleware/checkUser.js";
import bcrypt, { hash } from "bcryptjs";

export const authRouter = exp.Router();


//register
authRouter.post("/auth", async (req, res) => {
  try {

    const { username, email,password } = req.body;
    const HashedPass = await bcrypt.hash(String(password), 10)
    
    console.log("req body in login ; ",req.body)


    // check if username exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        message: "Username already taken"
      });
    }

    // check if email exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }
    const newUser = await User.create(
        {
            ...req.body,
            password:HashedPass,
        }
    )

    res.status(201).json({
      message: "User Created Successfully",
      payload: newUser
    });

  } catch (err) {

    console.error("Registration Error:", err);

    res.status(500).json({
      message: "Registration failed",
      error: err.message
    });

  }
});


//login
authRouter.post("/auth/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email"
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(String(password), user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    // generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, { httpOnly: true,sameSite:"strict" });


    res.json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        number: user.number,
        monthlyIncome: user.monthlyIncome
      }
    });

  } catch (err) {

    console.error("Login Error:", err);

    res.status(500).json({
      message: "Login failed",
      error: err.message
    });

  }

});


authRouter.get("/auth/profile", checkUser, async (req, res) => {

  try {

    res.json({
      message: "User profile fetched",
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        number: req.user.number,
        monthlyIncome: req.user.monthlyIncome
      }
    });

  } catch (err) {

    res.status(500).json({
      message: "Error fetching profile"
    });

  }

});

//edit profile details
authRouter.put("/auth/profile", checkUser, async (req, res) => {
  try {

    const { username, monthlyIncome, number } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          ...(username && { username }),
          ...(monthlyIncome && { monthlyIncome }),
          ...(number && { number })
        }
      },
      {
        new: true,
        runValidators: true   // ⭐ THIS IS THE FIX
      }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        number: updatedUser.number,
        monthlyIncome: updatedUser.monthlyIncome
      }
    });

  } catch (err) {

    res.status(400).json({
      message: err.message
    });

  }
});

//change password
authRouter.put("/auth/change-password", checkUser, async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({
        message: "Invalid User"
      });
    }

    const { currentPassword, newPassword } = req.body;

    // ✅ FIXED
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Password not matched"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: "Password changed successfully"
    });

  } catch (err) {

    console.error("Change Password Error:", err); // ⭐ add this

    res.status(500).json({
      message: "Failed to change password",
      error: err.message
    });

  }
});

//logout
authRouter.get('/logout', checkUser, async(req,res)=>{
  try{
    res.clearCookie("token");
    console.log(req?.body?.user+" logged out ")

    return res.status(200).json({ message: "User logged out" });

  } catch (err) {
    return res.status(400).json({message:"error in logout "+err.message})

  }
})